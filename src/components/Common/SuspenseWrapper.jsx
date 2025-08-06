import { Suspense } from "react";

const SuspenseWrapper = ({ children }) => {
  return (
    <Suspense
      fallback={
        <div className="d-flex justify-content-center align-items-center" style={{ width: '100vw', height: '100vh' }}>
          <i className="bx bx-loader-circle spin fs-1" />
        </div>
      }
    >
      {children}
    </Suspense>
  );
};

export default SuspenseWrapper;
