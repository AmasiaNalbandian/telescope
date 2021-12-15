import { createContext, ReactNode, useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/router';

export interface SearchContextInterface {
  post: string;
  author: string;
  startDate: string;
  endDate: string;
  showHelp: boolean;
  toggleHelp: (value: boolean) => void;
  onPostChange: (value: string) => void;
  onAuthorChange: (value: string) => void;
  onStartDateChange: (value: string) => void;
  onEndDateChange: (value: string) => void;
  onSubmitHandler: (value: FormEvent) => void;
}

const SearchContext = createContext<SearchContextInterface>({
  post: '',
  author: '',
  startDate: '',
  endDate: '',
  showHelp: true,
  toggleHelp() {
    throw new Error('This context must be wrapped inside SearchProvider');
  },
  onPostChange() {
    throw new Error('This context must be wrapped inside SearchProvider');
  },
  onAuthorChange() {
    throw new Error('This context must be wrapped inside SearchProvider');
  },
  onStartDateChange() {
    throw new Error('This context must be wrapped inside SearchProvider');
  },
  onEndDateChange() {
    throw new Error('This context must be wrapped inside SearchProvider');
  },
  onSubmitHandler() {
    throw new Error('This context must be wrapped inside SearchProvider');
  },
});

// Returns the string in the filter accordingly after loading results.
function getFilter(filter: any) {
  switch (filter) {
    case 'author':
      return 'author';
    case 'date':
      return 'date';
    case 'post':
    default:
      return 'post';
  }
}

type Props = {
  children: ReactNode;
};

const SearchProvider = ({ children }: Props) => {
  const router = useRouter();
  // We synchronize the `text` and `filter` values to the URL's query string
  // Router query object for a query can be an array if url becomes text=123&text=456
  // https://stackoverflow.com/questions/60110364/type-string-string-is-not-assignable-to-type-string
  const textParam = Array.isArray(router.query.text)
    ? router.query.text[0]
    : router.query.text || '';
  const filterParam = getFilter(router.query.filter);

  // We manage the state of `text` and `filter` internally, and update URL on
  // form submit only.  These are used in the <SearchBar>, and the user can change them.
  const [post, setPost] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  const [showHelp, setShowHelp] = useState(true);

  const onSubmitHandler = (event: FormEvent) => {
    event.preventDefault();
    // router.push(
    //   `/search?postText=${post}&authorText=${author}&endDate=${endDate}&startDate=${startDate}`
    // );
  };

  const toggleHelp = (value: boolean) => {
    setShowHelp(value);
  };

  const onPostChange = (value: string) => {
    setPost(value);
    console.log('sailoe');
  };

  const onAuthorChange = (value: string) => {
    setAuthor(value);
  };

  const onStartDateChange = (value: string) => {
    setStartDate(value);
  };

  const onEndDateChange = (value: string) => {
    setEndDate(value);
  };

  useEffect(() => {
    setPost(textParam);
    setAuthor(textParam);
    setStartDate(textParam);
    setEndDate(textParam);
  }, [textParam, filterParam]);

  return (
    <SearchContext.Provider
      value={{
        post,
        author,
        startDate,
        endDate,
        showHelp,
        toggleHelp,
        onPostChange,
        onAuthorChange,
        onStartDateChange,
        onEndDateChange,
        onSubmitHandler,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;
export { SearchContext };
