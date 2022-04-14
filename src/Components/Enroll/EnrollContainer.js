import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { AppBar, Box, Tab, Tabs, } from '@mui/material';
import { useTheme } from '@mui/styles';

import PrescriberEnrollmentForm from './Forms/PrescriberForms/PrescriberEnrollmentForm';
import PatientEnrollmentForm from './Forms/PatientForms/PatientEnrollmentForm';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const classes = {
  root: (theme) => ({
    backgroundColor: theme.palette.background.paper,
    width: '100%',
    minHeight: 'calc(100% - 84px)',
  }),
};

export default function EnrollContainer() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <Box sx={(t)=>classes.root(t)}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="Prescriber" {...a11yProps(0)} />
          <Tab label="Patient" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <PrescriberEnrollmentForm />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <PatientEnrollmentForm />
        </TabPanel>
      </SwipeableViews>
    </Box>
  );
}