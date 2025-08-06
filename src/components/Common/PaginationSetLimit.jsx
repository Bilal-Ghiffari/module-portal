import Select from 'react-select';
import { reactSlcStylesPagination } from '@/lib/ReactSelect';

const optShowData = [
  {
    value: 10,
    label: '10'
  },
  {
    value: 25,
    label: '25'
  },
  {
    value: 50,
    label: '50'
  },
  {
    value: 100,
    label: '100'
  },
  {
    value: 250,
    label: '250'
  },
  {
    value: 500,
    label: '500'
  }
];

const optShowData2 = [
  {
    value: 10,
    label: '10'
  },
  {
    value: 25,
    label: '25'
  },
  {
    value: 50,
    label: '50'
  },
  {
    value: 100,
    label: '100'
  },
  {
    value: 500,
    label: '500'
  },
  {
    value: 1000,
    label: '1000'
  },
  {
    value: 5000,
    label: '5000'
  }
];
const PaginationSetLimit = ({ limitPerPage, setShowData, newLimit }) => {
  return (
    <Select
      name="show_data"
      placeholder="Banyaknya Data"
      value={newLimit ? optShowData2.find((option) => option.value == limitPerPage) : optShowData.find((option) => option.value == limitPerPage)}
      onChange={(e) => {
        setShowData(e.value || '10');
      }}
      isSearchable={true}
      options={newLimit ? optShowData2 : optShowData}
      styles={reactSlcStylesPagination}
    />
  );
};

export default PaginationSetLimit;
