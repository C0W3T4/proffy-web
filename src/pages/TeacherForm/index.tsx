import React, { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';

import api from '../../services/api';

import warningIcon from '../../assets/images/icons/warning.svg';

import './styles.css';

function TeacherForm() {
  const history = useHistory();

  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [bio, setBio] = useState('');

  const [subject, setSubject] = useState('');
  const [cost, setCost] = useState('');

  const [scheduleItems, setScheduleItems] = useState([
    { week_day: 0, from: '', to: ''}
  ]);

  function addNewScheduleItem() {
    setScheduleItems([
      ...scheduleItems,
      { week_day: 0, from: '', to: ''}
    ]);
  }

  function setScheduleItemValue(position: number, field: string, value: string) {
    const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
      if (index === position) {
        return { ...scheduleItem, [field]: value };
      }

      return scheduleItem;
    });
    return setScheduleItems(updatedScheduleItems);
  }

  function handleCreateClass(e: FormEvent) {
    e.preventDefault();

    api.post('/classes', {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost: Number(cost),
      schedule: scheduleItems
    }).then(() => {
      alert('Thanks for sign up!');
      history.push('/');
      
    }).catch(() => {
      alert('Registration error, please try again!')
    });
  }

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader 
        title="How amazing you want to teach!" 
        description="The first step is to complete this registration form"
      />

      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Your data</legend>

            <Input 
              name="name" 
              label="Full name" 
              value={name}
              onChange={(e) => { setName(e.target.value) }}
            />
            <Input
              name="avatar"
              label="Avatar" 
              value={avatar}
              onChange={(e) => { setAvatar(e.target.value) }}
            />
            <Input 
              name="whatsapp" 
              label="WhatsApp" 
              value={whatsapp}
              onChange={(e) => { setWhatsapp(e.target.value) }}
            />
            <Textarea 
              name="bio" 
              label="Biography" 
              value={bio}
              onChange={(e) => { setBio(e.target.value) }}
            />
          </fieldset>

          <fieldset>
            <legend>About class</legend>

            <Select 
              name="subject" 
              label="Subject" 
              value={subject}
              onChange={(e) => { setSubject(e.target.value) }}
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
            <Input 
              name="cost" 
              label="Cost per hour of class" 
              value={cost}
              onChange={(e) => { setCost(e.target.value) }}
            />
          </fieldset>

          <fieldset>
            <legend>
              Available schedules
              <button type="button" onClick={addNewScheduleItem}>
                + New schedule
              </button>
            </legend>

            { scheduleItems.map((scheduleItem, index) => {
              return (
                <div key={scheduleItem.week_day} className="schedule-item">
                  <Select 
                    name="week_day" 
                    label="Week day" 
                    value={scheduleItem.week_day}
                    onChange={(e) => setScheduleItemValue(index, 'week_day', e.target.value)}
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
                  <Input 
                    name="from" 
                    label="From" 
                    type="time" 
                    value={scheduleItem.from}
                    onChange={(e) => setScheduleItemValue(index, 'from', e.target.value)}
                  />
                  <Input 
                    name="to" 
                    label="To" 
                    type="time" 
                    value={scheduleItem.to}
                    onChange={(e) => setScheduleItemValue(index, 'to', e.target.value)}
                  />
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

            <button type="submit">
              Sign up
            </button>
          </footer>
        </form>
      </main>
    </div>
  );
}

export default TeacherForm;
