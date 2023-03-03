import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import "@sass/global.scss";
import authApis from "@apis/auth.api";
import { useAppDispatch } from "@hooks/redux";
import { logOut, loginSuccess } from "@redux/slices/Auth.slice";

function App() {
  const [pending, setPending] = useState<boolean>(true)
  const dispatch = useAppDispatch()
  useEffect(() => {
    authApis.getProfile()
      .then(res => dispatch(loginSuccess(res.data.data)))
      .catch(() => dispatch(logOut())).finally(() => setPending(false))
  }, [])

  if (pending) {
    return <div>Loading...</div>
  }
  return (
    <div className="App">
      <Outlet />
    </div>
  );
}

export default App;
