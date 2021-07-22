import React, { useState } from 'react';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';

import warningIcon from '../../assets/images/icons/warning.svg';

import './styles.css';

function TeacherForm() {
  const [scheduleItems, setScheduleItems] = useState([
    { week_day: 0, from: '', to: ''}
  ]);

  function addNewScheduleItem() {
    setScheduleItems([
      ...scheduleItems,
      { week_day: 0, from: '', to: ''}
    ]);
  }

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader 
        title="How amazing you want to teach!" 
        description="The first step is to complete this registration form"
      />

      <main>
        <fieldset>
          <legend>Your data</legend>

          <Input name="name" label="Full name" />
          <Input name="avatar" label="Avatar" />
          <Input name="whatsapp" label="WhatsApp" />
          <Textarea name="bio" label="Biography" />
        </fieldset>

        <fieldset>
          <legend>About class</legend>

          <Select 
            name="subject" 
            label="Subject" 
            options={[
              { value: 'Art', label: 'Art'},
              { value: 'Biology', label: 'Biology'},
              { value: 'Sciences', label: 'Sciences'},
              { value: 'Physical education', label: 'Physical education'},
              { value: 'Physics', label: 'Physics'},
              { value: 'Geography', label: 'Geography'},
              { value: 'History', label: 'History'},
              { value: 'Math', label: 'Math'},
              { value: 'Portuguese', label: 'Portuguese'},
              { value: 'Chemistry', label: 'Chemistry'}
            ]}
          />
          <Input name="cost" label="Cost per hour of class" />
        </fieldset>

        <fieldset>
          <legend>
            Available schedules
            <button type="button" onClick={addNewScheduleItem}>
              + New schedule
            </button>
          </legend>

          { scheduleItems.map(scheduleItem => {
            return (
              <div key={scheduleItem.week_day} className="schedule-item">
                <Select 
                  name="week_day" 
                  label="Week day" 
                  options={[
                    { value: '0', label: 'Sunday'},
                    { value: '1', label: 'Monday'},
                    { value: '2', label: 'Tuesday'},
                    { value: '3', label: 'Wednesday'},
                    { value: '4', label: 'Thursday'},
                    { value: '5', label: 'Friday'},
                    { value: '6', label: 'Saturday'}
                  ]}
                />
                <Input name="from" label="From" type="time" />
                <Input name="to" label="To" type="time" />
              </div>
            );
          }) }
        </fieldset>
        <footer>
          <p>
            <img src={ warningIcon } alt="Notice important" />
            Important! <br />
            Fill all data
          </p>

          <button type="button">
            Sign up
          </button>
        </footer>
      </main>
    </div>
  );
}

export default TeacherForm;
