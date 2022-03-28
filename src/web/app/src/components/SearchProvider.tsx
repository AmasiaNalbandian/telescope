import { createContext, ReactNode, useState, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/router';

export interface SearchContextInterface {
  post: string;
  author: string;
  shouldSearch: boolean;
  showHelp: boolean;
  toggleHelp: (value: boolean) => void;
  toggleSearch: (value: boolean) => void;
  onPostChange: (value: string) => void;
  onAuthorChange: (value: string) => void;
  onSubmitHandler: (value: FormEvent) => void;
}

const SearchContext = createContext<SearchContextInterface>({
  post: '',
  author: '',
  showHelp: true,
  shouldSearch: false,
  toggleSearch() {
    throw new Error('This context must be wrapped inside SearchProvider');
  },
  toggleHelp() {
    throw new Error('This context must be wrapped inside SearchProvider');
  },
  onPostChange() {
    throw new Error('This context must be wrapped inside SearchProvider');
  },
  onAuthorChange() {
    throw new Error('This context must be wrapped inside SearchProvider');
  },
  onSubmitHandler() {
    throw new Error('This context must be wrapped inside SearchProvider');
  },
});

type Props = {
  children: ReactNode;
};

const SearchProvider = ({ children }: Props) => {
  const router = useRouter();
  // We synchronize the `text` and `filter` values to the URL's query string
  // Router query object for a query can be an array if url becomes text=123&text=456
  // https://stackoverflow.com/questions/60110364/type-string-string-is-not-assignable-to-type-string
  const authorParam = Array.isArray(router.query.author)
    ? router.query.author[0]
    : router.query.author || '';
  const postParam = Array.isArray(router.query.post)
    ? router.query.post[0]
    : router.query.post || '';

  // We manage the state of `text` and `filter` internally, and update URL on
  // form submit only.  These are used in the <SearchBar>, and the user can change them.
  const [post, setPost] = useState('');
  const [author, setAuthor] = useState('');
  const [shouldSearch, setShouldSearch] = useState(false);
  const [showHelp, setShowHelp] = useState(true);

  const toggleHelp = (value: boolean) => {
    setShowHelp(value);
  };

  const toggleSearch = (value: boolean) => {
    console.log('toggle search new value', value);
    setShouldSearch(value);
  };

  const onPostChange = (value: string) => {
    console.log('on post');

    setPost(value);
  };

  const onAuthorChange = (value: string) => {
    console.log('on author');

    setAuthor(value);
  };

  const onSubmitHandler = (event: FormEvent) => {
    event.preventDefault();
    console.log('submit handler');
    toggleSearch(true);
    router.push(
      `/search?${author ? `author=${author}${post ? `&post=${post}` : ``}` : ``}${
        !author && post ? `post=${post}` : ``
      }`
    );
  };

  useEffect(() => {
    setAuthor(authorParam);
    setPost(postParam);
  }, [authorParam, postParam]);

  return (
    <SearchContext.Provider
      value={{
        post,
        author,
        showHelp,
        shouldSearch,
        toggleSearch,
        onPostChange,
        onAuthorChange,
        onSubmitHandler,
        toggleHelp,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;
export { SearchContext };
