import React, {
  useCallback, useContext, useEffect, useState,
} from 'react';
import {
  Divider, Icon, Select, Tooltip
} from 'antd';
import { PanelProvider } from '../../../../panel/panel.provider';
import { METRIC_CATALOGUE } from '../../../../panel/panel.constants';
import { Styling } from './ManageColumns.styles';
import './ManageColumns.scss';

const { Option } = Select;

const ManageColumns = (props) => {
  const {
    onlyAdd,
    currentMetric, placeholder, width,
  } = props;
  const {
    contextActions,
    panelState: { columns },
  } = useContext(PanelProvider);
  const [availableColumns, setAvailableColumns] = useState(Object.values(METRIC_CATALOGUE));

  useEffect(() => {
    setAvailableColumns(
      Object.values(METRIC_CATALOGUE).filter((metric) => !columns.find((item) => item === metric.simpleName)),
    );
  }, [columns]);

  const changeColumn = useCallback(
    (column) => {
      if (onlyAdd) {
        contextActions.addColumn(column);
      } else {
        contextActions.changeColumn({
          column,
          oldColumn: currentMetric,
        });
      }
    },
    [currentMetric, onlyAdd],
  );

  const removeColumn = useCallback(() => contextActions.removeColumn(currentMetric), [
    currentMetric,
  ]);

  const Placeholder = () => (!onlyAdd ? (
    <Tooltip
      title={placeholder && METRIC_CATALOGUE[placeholder].humanizeName}
      placement="topLeft"
    >
      <span className={Styling.placeholder}>
        {placeholder && METRIC_CATALOGUE[placeholder].humanizeName}
      </span>
    </Tooltip>
  ) : (
    <div className={Styling.placeholder}>
      <i className="fa fa-plus-circle" style={{ marginRight: '5px' }} />
      <span> Add column</span>
    </div>
  ));

  const dropdownRender = (menu) => (
    <div className="add-column-wrapper">
      {menu}
      <Divider style={{ margin: '4px 0' }} />
      {!onlyAdd && columns.length > 1 && (
        <div
          style={{ padding: '4px 8px', cursor: 'pointer' }}
          onMouseDown={(e) => e.preventDefault()}
          onClick={removeColumn}
        >
          <Icon type="minus" style={{ marginRight: '4px' }} />
          Remove column
        </div>
      )}
    </div>
  );
  // @ts-ignore
  return (
    <div className={!onlyAdd ? 'manage-columns' : 'add-columns'} onClick={(e) => e.stopPropagation()}>
      <Select
        optionLabelProp="label"
        showSearch
        style={{ width: width || '160px' }}
        placeholder={<Placeholder />}
        filterOption={(value, option) => String(option.props.label)
          .toLowerCase()
          .includes(value.toLowerCase())}
        onChange={changeColumn}
        dropdownMatchSelectWidth={false}
        value={undefined}
        showArrow={false}
        className={`${onlyAdd ? 'add' : 'manage'}-columns-selector`}
        dropdownClassName={`${onlyAdd ? 'add' : 'manage'}-columns-selector-dropdown`}
        dropdownRender={dropdownRender}
      >
        {availableColumns.map((item) => (
          <Option key={item.simpleName} label={item.humanizeName}>
            {item.humanizeName}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default ManageColumns;
