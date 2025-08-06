import { useEffect, useState } from 'react';
import './style.css';
import { apiGetRunningTeks } from '@/helpers/backend_helper_usman';

const RunningText = ({ roleCode }) => {
  const [data, setData] = useState('');

  useEffect(() => {
    apiGetRunningTeks({ r_roles_code: roleCode }).then((res) => {
      if (res?.data && Array.isArray(res.data)) {
        // gabungkan title dan message jadi satu teks
        const combinedText = res.data
          .map((item) => `📢 ${item.title}: ${item.message}`)
          .join(' | ');

        setData(combinedText);
      }
    });
  }, [roleCode]);

  return (
    <>
      {data && (
        <div className="running-text-container mb-4">
          <div className="scrolling-content">
            <span>{data}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default RunningText;
