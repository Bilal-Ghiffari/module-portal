import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postFormData, postLayananFormData } from '@/helpers/api_helper';

const Bypass = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    postFormData('/auth/login/bypass').then((res) => {
      // console.log("res", res?.data);
      // localStorage.setItem("resUser", JSON.stringify(res.data));
      // if (res.data.token) {
      //   setTimeout(() => {
      //     setLoading(false);
      //     window.location.href = "/";
      //   }, 2000); // tambah delay sedikit biar animasinya sempat terlihat
      // }
    });
  }, []);

  // useEffect(() => {
  //   if (localStorage.getItem("userSession")) {
  //     navigate("/", { replace: true });
  //   }
  // }, [navigate]);

  // console.log("runnn");

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#0d1117',
        color: '#f44336',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'monospace',
        padding: '2rem',
      }}
    >
      <h1
        style={{
          fontSize: '3rem',
          marginBottom: '1rem',
          textShadow: '0 0 10px red',
          textAlign: 'center',
        }}
      >
        ⚠️ WARNING ⚠️
      </h1>
      <p style={{ fontSize: '1.5rem', textAlign: 'center', maxWidth: '600px' }}>
        Sistem ini hanya dapat diakses oleh pengguna yang berwenang.
        <br />
        Segala bentuk akses tanpa izin akan dilaporkan dan diproses.
      </p>

      {loading && (
        <div
          style={{
            marginTop: '2rem',
            border: '1px dashed #f44336',
            padding: '1.5rem 2.5rem',
            borderRadius: '8px',
            backgroundColor: '#1e1e1e',
            color: '#fff',
            fontSize: '1.1rem',
            textAlign: 'center',
            animation: 'pulse 1.5s infinite',
          }}
        >
          <p style={{ margin: 0 }}>
            🛡️ Autentikasi Token...
            <span className="dots">
              <span>.</span>
              <span>.</span>
              <span>.</span>
            </span>
          </p>
        </div>
      )}

      <style>{`
        @keyframes pulse {
          0% { box-shadow: 0 0 5px red; }
          50% { box-shadow: 0 0 20px red; }
          100% { box-shadow: 0 0 5px red; }
        }

        .typewriter {
          overflow: hidden;
          border-right: .15em solid red;
          white-space: nowrap;
          animation: typing 3s steps(30, end), blink-caret .75s step-end infinite;
        }

        @keyframes typing {
          from { width: 0 }
          to { width: 100% }
        }

        @keyframes blink-caret {
          from, to { border-color: transparent }
          50% { border-color: red }
        }

        .dots span {
          animation: blink 1.4s infinite both;
          margin-left: 2px;
        }

        .dots span:nth-child(2) {
          animation-delay: 0.2s;
        }

        .dots span:nth-child(3) {
          animation-delay: 0.4s;
        }

        @keyframes blink {
          0%, 80%, 100% {
            opacity: 0;
          }
          40% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default Bypass;
