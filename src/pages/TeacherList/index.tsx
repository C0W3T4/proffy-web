import React, { FormEvent, useState } from 'react';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import Select from '../../components/Select';

import api from '../../services/api';

import './styles.css';

function TeacherList() {
  const [teachers, setTeachers] = useState([]);

  const [subject, setSubject] = useState('');
  const [week_day, setWeekDay] = useState('');
  const [time, setTime] = useState('');

  async function searchTeachers(e: FormEvent) {
    e.preventDefault();

    const response = await api.get('/classes', {
      params: {
        subject,
        week_day,
        time
      }
    });

    setTeachers(response.data);
  }

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="These are the available teachers!">
        <form id="search-teachers" onSubmit={searchTeachers}>
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
          <Select 
            name="week_day" 
            label="Week day"
            value={week_day}
            onChange={(e) => { setWeekDay(e.target.value) }} 
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
            type="time" 
            name="time" 
            label="Hour" 
            value={time}
            onChange={(e) => { setTime(e.target.value) }}
          />
          <button type="submit">
            Search
          </button>
        </form>
      </PageHeader>

      <main>
        { teachers.map((teacher: Teacher) => {
          return (
            <TeacherItem key={teacher.id} teacher={teacher} />
          );
        })}
      </main>
    </div>
  );
}

export default TeacherList;
