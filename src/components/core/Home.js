import ProductCard from "../cards/ProductCard";
import IntroHome from "./IntroHome";
import {
  QueryClient,
  QueryClientProvider,
  useQueryErrorResetBoundary,
} from "react-query";
import { ErrorBoundary } from "react-error-boundary";

const queryClient = new QueryClient();

const Home = () => {
  const { reset } = useQueryErrorResetBoundary();
  return (
    <div className="home">
      <IntroHome />
      <div className="container mt-4 home-contain">
        <p className="lead text-white">Welcome to my E-Commerce App</p>
        <ErrorBoundary
          onReset={reset}
          fallbackRender={({ resetErrorBoundary }) => (
            <div>There was an error!</div>
          )}
        >
          <QueryClientProvider client={queryClient}>
            <ProductCard />
          </QueryClientProvider>
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default Home;
