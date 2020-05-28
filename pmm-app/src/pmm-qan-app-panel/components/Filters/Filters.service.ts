import { apiRequestQAN } from '../../../react-plugins-deps/components/helpers/api';
import { getLabelQueryParams } from '../../panel/panel.tools';


const markCheckedLabels = (labels, paramLabels) => {
  Object.keys(labels).forEach((label) => {
    labels[label].name.forEach((metric) => {
      const passedVariables = paramLabels[label];
      // eslint-disable-next-line no-param-reassign
      metric.checked = passedVariables;
      if (!passedVariables) {
        return;
      }
      passedVariables.some((variable) => {
        if (!metric.value) {
          // eslint-disable-next-line no-param-reassign
          metric.value = '';
        }
        return variable === metric.value;
      });
    });
  });

  return labels;
};

class FiltersService {
  static async getQueryOverviewFiltersList(paramLabels, from, to, mainMetric) {
    const { labels } = await apiRequestQAN.post<any, any>('/Filters/Get', {
      labels: getLabelQueryParams(paramLabels),
      main_metric_name: mainMetric,
      period_start_from: from,
      period_start_to: to,
    });
    return markCheckedLabels(labels, paramLabels);
  }
}

export default FiltersService;
