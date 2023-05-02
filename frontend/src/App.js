import React from 'react';

// We use Route in order to define the different routes of our application
import { Route, Routes } from 'react-router-dom';

// We import all the components we need in our app
import Navbar from './components/navbar';
import RecordList from './components/recordList/recordList';
import EquipmentList from './components/equipmentList/equipmentList';
import RecordEdit from './components/recordList/edit';
import EquipmentEdit from './components/equipmentList/edit';
import RecordCreate from './components/recordList/create';
import EquipmentCreate from './components/equipmentList/create';
import RewardList from './components/rewardList/rewardList';
import RewardCreate from './components/rewardList/create';
import RewardEdit from './components/rewardList/edit';

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <>
              <RecordList />
              <EquipmentList />
              <RewardList />
            </>
          }
        />
        <Route path="/record-edit/:id" element={<RecordEdit />} />
        <Route path="/equipment-edit/:id" element={<EquipmentEdit />} />
        <Route path="/record-create" element={<RecordCreate />} />
        <Route path="/equipment-create" element={<EquipmentCreate />} />
        <Route path="/reward-create" element={<RewardCreate />} />
        <Route path="/reward-edit/:id" element={<RewardEdit />} />
      </Routes>
    </div>
  );
};

export default App;
