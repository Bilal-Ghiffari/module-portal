import Select from 'react-select';
import { Row, Col, Label } from 'reactstrap';
import { getDropdownRoles } from '@/store/actions';
import { reactSlcStyles } from '@/lib/ReactSelect';
import { useDispatch, useSelector } from 'react-redux';
import { useMemo, useEffect } from 'react';

const FilterUserman = ({ filter, setFilter, clickSearch }) => {
  const { list_dropdown_roles } = useSelector((el) => el.Usman);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDropdownRoles());
  }, []);

  const uniqueData = useMemo(() => {
    return Array.from(new Map(list_dropdown_roles?.data?.map((item) => [item.code, item])).values());
  }, [list_dropdown_roles]);

  return (
    <div className="p-2 rounded bg-secondary-subtle">
      <Row>
        <Col md={6} lg={4}>
          <Label htmlFor="validationCustom01" className="col-form-label py-0">
            Nama Role
          </Label>
          <Select
            name="roles_code"
            placeholder="Nama Role"
            getOptionValue={(option) => option.code}
            getOptionLabel={(option) => option.title}
            onChange={(e) => {
              setFilter({ ...filter, roles_code: e });
              clickSearch(e);
            }}
            options={uniqueData}
            className="select2-selection"
            styles={reactSlcStyles}
            isClearable
          />
        </Col>
      </Row>
    </div>
  );
};
export default FilterUserman;
