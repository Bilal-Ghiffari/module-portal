import React, { useEffect } from "react";
import PropTypes from "prop-types";
import withRouter from "../../components/Common/withRouter";
import { logoutUser } from "../../store/actions";

//redux
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastifyService } from "@/components/Toastify/toastifyService";

const toastifyService = new ToastifyService()
const Logout = () => {
  const history = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    toastifyService.customShowLoading({title: 'Harap Tunggu',msg:'Proses Logout...'});
    dispatch(logoutUser(history));

    setTimeout(() => {
      history("/login");
      toastifyService.close();
    }, 250);
  }, [dispatch, history]);

  return <></>;
};

Logout.propTypes = {
  history: PropTypes.object,
};

export default withRouter(Logout);
