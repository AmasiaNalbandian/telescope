const { ELASTIC_MAX_RESULTS_PER_PAGE = 5, POSTS_URL } = process.env;
const { client } = require('./elastic');

const index = 'posts';
const type = 'post';

/**
 * Creates fields from filter, now the filter is used for author and post but it will be added more.
 * the fields will be used for ES
 * @param {string} filter
 */
const createFieldsFromFilter = (filter) => {
  switch (filter) {
    case 'author':
      return ['author'];
    case 'date':
      return ['published'];
    case 'post':
    default:
      return ['text', 'title'];
  }
};

const sortFromFilter = (filter) => {
  switch (filter) {
    case 'author':
      return [{ published: { order: 'desc' } }];
    case 'post':
    default:
      return undefined;
  }
};

const calculateFrom = (page, perPage) => {
  const ES_MAX = 10000; // 10K is the upper limit of what ES will return without issue for searches
  const wanted = page * perPage;
  // Don't exceed 10K, and if we will, return an offset under it by one page size
  return wanted + perPage <= ES_MAX ? wanted : ES_MAX - perPage;
};

/**
 * Searches text in elasticsearch
 * @param textToSearch
 * @param filter
 * @return all the results matching the passed text
 */
// Simple queries: https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-simple-query-string-query.html
const search = async (
  textToSearch,
  filter = 'post',
  page = 0,
  perPage = ELASTIC_MAX_RESULTS_PER_PAGE
) => {
  const query = {
    query: {
      simple_query_string: {
        query: textToSearch,
        default_operator: 'and',
        fields: createFieldsFromFilter(filter),
      },
    },
    sort: sortFromFilter(filter),
  };

  const {
    body: { hits },
  } = await client.search({
    from: calculateFrom(page, perPage),
    size: perPage,
    _source: ['id'],
    index,
    type,
    body: query,
  });

  return {
    results: hits.total.value,
    values: hits.hits.map(({ _id }) => ({ id: _id, url: `${POSTS_URL}/${_id}` })),
  };
};

/**
 * Advanced search allows you to look up multiple or single fields based on the input provided
 * @param postText    - text to search in post field
 * @param authorText  - text to search in author field
 * @param titleText   - text to search in title field
 * @param dateStart   - published after this date
 * @param dateEnd     - published before this date
 * @return all the results matching the fields text
 * Range queries: https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-query-string-query.html#_ranges
 * Match field queries: https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-match-query.html#query-dsl-match-query-zero
 */
const advancedSearch = async (
  postText = '',
  authorText = '',
  titleText = '',
  dateStart = '2000-01-01',
  dateEnd = 'now',
  page = 0,
  perPage = ELASTIC_MAX_RESULTS_PER_PAGE
) => {
  const query = {
    query: {
      bool: {
        must: [
          {
            match: {
              author: {
                query: authorText,
                zero_terms_query: 'all',
              },
            },
          },
          {
            match: {
              text: {
                query: postText,
                zero_terms_query: 'all',
              },
            },
          },
          {
            match: {
              title: {
                query: titleText,
                zero_terms_query: 'all',
              },
            },
          },
          {
            range: {
              published: {
                gte: dateStart,
                lte: dateEnd,
              },
            },
          },
        ],
      },
    },
  };

  const {
    body: { hits },
  } = await client.search({
    from: calculateFrom(page, perPage),
    size: perPage,
    _source: ['id'],
    index,
    type,
    body: query,
  });

  return {
    results: hits.total.value,
    values: hits.hits.map(({ _id }) => ({ id: _id, url: `${POSTS_URL}/${_id}` })),
  };
};
module.exports = { search, advancedSearch };
