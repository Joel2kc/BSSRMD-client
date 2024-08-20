import { Switch, Route } from "wouter";
import Home from "./pages/home";
import CatchAll from "./pages/catchall";
import Dashboard from "./pages/dashboard";
import SharedWithMe from "./pages/sharedwithme";
import Trash from "./pages/trash";
import Register from "./pages/register";
import Login from "./pages/login";
import Verify from "./pages/verify";
import Reset from "./pages/reset";
import FileUploader from "./components/fileuploader";
import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MediaPreview from "./components/mediapreview";
import RenameDialog from "./components/renamedialog ";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <div className="bg-neutral text-contrast">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        pauseOnHover={false}
        pauseOnFocusLoss={false}
        closeButton={false}
        limit={1}
        stacked
      />

      <RecoilRoot>
        <MediaPreview />
        <QueryClientProvider client={queryClient}>
          <RenameDialog />
          <FileUploader />
          <Switch>
            <Route component={Home} path="/" />
            <Route component={Register} path="/register" />
            <Route component={Login} path="/login" />
            <Route component={Verify} path="/verify/:rid/:acuid" />
            <Route component={Reset} path="/reset" />

            {/* Authenticated Routes  */}

            <Route component={Dashboard} path="/cloud" />
            <Route component={SharedWithMe} path="/cloud/shared" />
            <Route component={Trash} path="/cloud/trash" />
            <Route component={CatchAll} path="/*:rest*" />
          </Switch>
        </QueryClientProvider>
      </RecoilRoot>
    </div>
  );
}

export default App;
