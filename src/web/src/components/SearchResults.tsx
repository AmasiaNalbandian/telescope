import { makeStyles, Theme } from '@material-ui/core/styles';
import useSWRInfinite from 'swr/infinite';
import { Container, Box, createStyles } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { searchServiceUrl } from '../config';
import Timeline from './Posts/Timeline';
import Spinner from './Spinner';
import useSearchValue from '../hooks/use-search-value';

const NoResultsImg = '/noResults.svg';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    spinner: {
      display: 'flex',
      justifyContent: 'center',
    },
    searchResults: {
      width: '81vw',
      justifyContent: 'center',
    },
    errorBackground: {
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '10px',
      background: '#353F61',
      boxShadow: '0 15px 30px rgba(0,0,0,.5)',
      lineHeight: '1rem',
    },
    errorTitle: {
      textAlign: 'center',
      fontSize: '5rem',
      color: '#fff',
    },
    errorMessage: {
      lineHeight: '2rem',
      fontSize: '2rem',
      textAlign: 'center',
      margin: '2rem',
      color: '#96C1E7',
    },
    noResults: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      margin: '2rem',
      color: theme.palette.primary.main,
    },
  })
);

const SearchResults = () => {
  const classes = useStyles();
  const { post, author, toggleHelp, shouldSearch, toggleSearch } = useSearchValue();
  const [totalPosts, setTotalPosts] = useState(0);

  const prepareUrl = (index: number) =>
    `${searchServiceUrl}/?author=${encodeURIComponent(author)}&post=${encodeURIComponent(
      post
    )}&page=${index}`;

  // We only bother doing the request if we have something to search for.
  const { data, size, setSize, error } = useSWRInfinite(
    (index: number) => (shouldSearch ? prepareUrl(index) : null),
    async (u: string) => {
      const res = await fetch(u);
      const results = await res.json();
      setTotalPosts(results.results);
      return results.values;
    }
  );

  useEffect(() => {
    toggleSearch(false);

    console.log('use effect');
  }, [author, post]);

  const loading = !data && !error && shouldSearch;
  // Search result is empty when the the array of posts on the first page is empty
  const isEmpty = data?.[0]?.length === 0;
  // There no more posts when the last page has no posts
  const isReachingEnd = !data?.[data.length - 1]?.length;
  // Another page is being loaded when size is incremented but data[size - 1] is still undefined
  const loadingMoreData =
    !isReachingEnd && data && size > 0 && typeof data[size - 1] === 'undefined';

  // If there is no posts or if the search bar is empty, then show the search help, otherwise hide it
  if (!error && isEmpty && (!author.length || !post.length)) {
    toggleHelp(true);
  } else {
    toggleHelp(false);
  }

  if (error) {
    console.log('bucket 3');

    return (
      <Container className={classes.searchResults}>
        <Box boxShadow={2} marginTop={10}>
          <div className={classes.errorBackground}>
            <div>
              <p className={classes.errorTitle}>Search Error</p>
              <p className={classes.errorMessage}>
                There was a server error while processing your query
              </p>
            </div>
          </div>
        </Box>
      </Container>
    );
  }

  if (loading) {
    console.log('bucket 2');

    return (
      <Container className={classes.searchResults}>
        <h1 className={classes.spinner}>
          <Spinner />
        </h1>
      </Container>
    );
  }

  // if (data === undefined) {
  //   console.log('bucket 1');
  //   return null;
  // }

  console.log('bucket 4');
  return (
    <Container className={classes.searchResults}>
      {!isEmpty ? (
        <>
          <Timeline pages={data} totalPosts={totalPosts} nextPage={() => setSize(size + 1)} />
          {loadingMoreData && (
            <h1 className={classes.spinner}>
              <Spinner />
            </h1>
          )}
        </>
      ) : (
        <div className={classes.noResults}>
          <img src={NoResultsImg} alt="No Results Found" height={200} width={200} />
          <h1>No Results Found</h1>
        </div>
      )}
    </Container>
  );
};

export default SearchResults;
