import { createContext, ReactNode, useState, FormEvent } from 'react';
import { useRouter } from 'next/router';

export interface SearchContextInterface {
  post: string;
  author: string;
  showHelp: boolean;
  toggleHelp: (value: boolean) => void;
  onPostChange: (value: string) => void;
  onAuthorChange: (value: string) => void;
  onSubmitHandler: (value: FormEvent) => void;
}

const SearchContext = createContext<SearchContextInterface>({
  post: '',
  author: '',
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
  onSubmitHandler() {
    throw new Error('This context must be wrapped inside SearchProvider');
  },
});

type Props = {
  children: ReactNode;
};

const SearchProvider = ({ children }: Props) => {
  const router = useRouter();

  // We manage the state of `text` and `filter` internally, and update URL on
  // form submit only.  These are used in the <SearchBar>, and the user can change them.
  const [post, setPost] = useState('');
  const [author, setAuthor] = useState('');
  const [showHelp, setShowHelp] = useState(true);

  const onSubmitHandler = (event: FormEvent) => {
    event.preventDefault();
    router.push(
      `/search?${author ? `author=${author}${post ? `&post=${post}` : ``}` : ``}${
        !author && post ? `post=${post}` : ``
      }`
    );
  };

  const toggleHelp = (value: boolean) => {
    setShowHelp(value);
  };

  const onPostChange = (value: string) => {
    setPost(value);
  };

  const onAuthorChange = (value: string) => {
    setAuthor(value);
  };

  return (
    <SearchContext.Provider
      value={{
        post,
        author,
        showHelp,
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
