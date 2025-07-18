import { createContext, useContext, useRef, useState } from 'react';
import { JOB_SUB_TYPES } from '../constants/jobSubTypes';
import { JOB_TYPES } from '../constants/jobTypes';
import { LICENSES } from '../constants/licenses';
import { LIGHT_THEME } from '../constants/themes';

const ComponentContext = createContext();

const testOffersList = [
  {
    type: 'job_1',
    subType: 'subjob_1',
    profession: 'license_1',
    description: 'Lorem ipsum del lorem',
    price: '200',
    images: [],
    startDateTime: '2025-07-10T05:50:00.000Z',
    endDateTime: '2025-07-19T07:40:00.000Z',
    createdAt: '2025-07-06T03:37:45.065Z',
    id: '1751773065065',
    status: 'open',
    creator: 'user_010',
    providers: [],
    approvedProvider: null,
  },
  {
    type: 'job_2',
    subType: 'subjob_2',
    profession: 'license_2',
    description: 'Lorem ipsum del lorem ipsum lore',
    price: '',
    images: [
      'data:image/png;base64,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',
    ],
    startDateTime: '2025-07-08T05:40:00.000Z',
    endDateTime: '2025-07-19T08:40:00.000Z',
    createdAt: '2025-07-06T03:38:47.832Z',
    id: '1751773127832',
    status: 'open',
    creator: 'user_010',
    providers: [
      'user_005',
      'user_003',
      'user_002',
      'user_001',
      'user_004',
      'user_006',
    ],
    approvedProvider: null,
  },
  {
    type: 'job_2',
    subType: 'subjob_2',
    profession: 'license_2',
    description: 'Lorem ipsum del lorem ipsum lore',
    price: '',
    images: [
      'data:image/png;base64,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',
    ],
    startDateTime: '2025-07-08T05:40:00.000Z',
    endDateTime: '2025-07-19T08:40:00.000Z',
    createdAt: '2025-07-06T03:38:47.832Z',
    id: '1751773127777',
    status: 'open',
    creator: 'user_010',
    providers: [
      'user_005',
      'user_003',
      'user_002',
      'user_001',
      'user_004',
      'user_006',
    ],
    approvedProvider: 'user_005',
  },
  {
    type: 'job_2',
    subType: 'subjob_2',
    profession: 'license_2',
    description: 'Lorem ipsum del lorem ipsum lore',
    price: '',
    images: [
      'data:image/png;base64,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',
    ],
    startDateTime: '2025-07-08T05:40:00.000Z',
    endDateTime: '2025-07-19T08:40:00.000Z',
    createdAt: '2025-07-06T03:38:47.832Z',
    id: '1751773127999',
    status: 'open',
    creator: 'user_010',
    providers: ['user_005', 'user_003', 'user_002', 'user_001'],
    approvedProvider: 'user_003',
  },
];

const testJobsList = Array.from({ length: 50 }, (_, index) => {
  const random = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;
  const professions = [...Object.keys(LICENSES)];
  const types = [...Object.keys(JOB_TYPES)];
  const subTypes = [...Object.keys(JOB_SUB_TYPES)];
  const sampleImages = [
    'https://placehold.co/600x400',
    'https://placehold.co/400x300',
    '',
  ];

  const id = Date.now() + index;
  const daysToAdd = random(1, 30);
  const startDate = new Date();
  startDate.setDate(startDate.getDate() + daysToAdd);
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + random(3, 10));

  return {
    type: types[random(0, types.length - 1)],
    subType: subTypes[random(0, subTypes.length - 1)],
    profession: professions[random(0, professions.length - 1)],
    description: `Test description ${index + 1}`,
    price: random(100, 500).toString(),
    images:
      Math.random() < 0.3
        ? [sampleImages[random(0, sampleImages.length - 1)]]
        : [],
    startDateTime: startDate.toISOString(),
    endDateTime: endDate.toISOString(),
    createdAt: new Date().toISOString(),
    id: id.toString(),
    status: 'open',
    creator: 'currentUserId',
    providers: Array.from(
      { length: random(0, 5) },
      (_, i) => `user_${String(random(1, 10)).padStart(3, '0')}`
    ),
  };
});

export const testUsers = [
  {
    id: 'user_001',
    name: 'John',
    surname: 'Doe',
    about: 'Experienced electrician with industrial automation background.',
    location: 'New York, USA',
    email: 'john.doe@example.com',
    phoneNumber: '+1-555-1234',
    professions: ['license_17', 'license_42'],
    jobTypes: ['job_14', 'job_28'],
    jobSubTypes: ['subjob_12', 'subjob_87', 'subjob_53'],
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
  {
    id: 'user_002',
    name: 'Anna',
    surname: 'Kowalski',
    about: 'Focused on smart home integrations and lighting.',
    location: 'Warsaw, Poland',
    email: 'anna.k@example.com',
    phoneNumber: '+48-601-234-567',
    professions: ['license_5'],
    jobTypes: ['job_9', 'job_24', 'job_36'],
    jobSubTypes: ['subjob_34', 'subjob_90'],
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
  },
  {
    id: 'user_003',
    name: 'Liam',
    surname: 'Nguyen',
    about: 'Specialist in renewable energy and backup systems.',
    location: 'Sydney, Australia',
    email: 'liam.nguyen@example.com',
    phoneNumber: '+61-400-987-654',
    professions: ['license_88'],
    jobTypes: ['job_20', 'job_41'],
    jobSubTypes: ['subjob_10', 'subjob_45'],
    avatar: null,
  },
  {
    id: 'user_004',
    name: 'Sophia',
    surname: 'Martinez',
    about: 'Known for creative lighting design and installations.',
    location: 'Barcelona, Spain',
    email: 'sophia.m@example.com',
    phoneNumber: '+34-655-321-789',
    professions: ['license_12', 'license_33'],
    jobTypes: ['job_9', 'job_17', 'job_40'],
    jobSubTypes: ['subjob_99'],
    avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
  },
  {
    id: 'user_005',
    name: 'Mohamed',
    surname: 'Ali',
    about: 'Works in high-load commercial setups.',
    location: 'Cairo, Egypt',
    email: 'm.ali@example.com',
    phoneNumber: '+20-100-222-3333',
    professions: ['license_25'],
    jobTypes: ['job_13', 'job_33'],
    jobSubTypes: ['subjob_7', 'subjob_38'],
    avatar: null,
  },
  {
    id: 'user_006',
    name: 'Emma',
    surname: 'Schneider',
    about: 'Expert in alarms, CCTV, and integrated security.',
    location: 'Berlin, Germany',
    email: 'emma.sch@example.de',
    phoneNumber: '+49-160-4567890',
    professions: ['license_3'],
    jobTypes: ['job_18', 'job_45'],
    jobSubTypes: ['subjob_61', 'subjob_62'],
    avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
  },
  {
    id: 'user_007',
    name: 'Yuki',
    surname: 'Tanaka',
    about: 'Handles large installations including transformers and generators.',
    location: 'Tokyo, Japan',
    email: 'yuki.t@example.jp',
    phoneNumber: '+81-90-1234-5678',
    professions: ['license_9', 'license_90'],
    jobTypes: ['job_21', 'job_28'],
    jobSubTypes: ['subjob_13'],
    avatar: null,
  },
  {
    id: 'user_008',
    name: 'Carlos',
    surname: 'Silva',
    about: 'Efficient in trenching, cabling, and data systems.',
    location: 'Lisbon, Portugal',
    email: 'carlos.s@example.pt',
    phoneNumber: '+351-912-345-678',
    professions: ['license_44'],
    jobTypes: ['job_30', 'job_32'],
    jobSubTypes: ['subjob_1', 'subjob_2'],
    avatar: 'https://randomuser.me/api/portraits/men/8.jpg',
  },
  {
    id: 'user_009',
    name: 'Fatima',
    surname: 'Rahman',
    about: 'Inspector and diagnostics expert.',
    location: 'Dhaka, Bangladesh',
    email: 'fatima.r@example.com',
    phoneNumber: '+880-171-2345678',
    professions: ['license_6'],
    jobTypes: ['job_25', 'job_26', 'job_35'],
    jobSubTypes: ['subjob_50', 'subjob_73'],
    avatar: null,
  },
  {
    id: 'user_010',
    name: 'Ivan',
    surname: 'Petrov',
    about: 'Supervises large infrastructure projects.',
    location: 'Moscow, Russia',
    email: 'ivan.petrov@example.ru',
    phoneNumber: '+7-915-555-1234',
    professions: ['license_1', 'license_2'],
    jobTypes: ['job_2', 'job_50'],
    jobSubTypes: ['subjob_11', 'subjob_22', 'subjob_33'],
    avatar: 'https://randomuser.me/api/portraits/men/10.jpg',
  },
];

const myProfileMock = {
  id: 'user_010',
  name: 'Ivan',
  surname: 'Petrov',
  about: 'Supervises large infrastructure projects.',
  location: 'Moscow, Russia',
  email: 'ivan.petrov@example.ru',
  phoneNumber: '+7-915-555-1234',
  professions: ['license_1', 'license_2'],
  jobTypes: ['job_2', 'job_50'],
  jobSubTypes: ['subjob_11', 'subjob_22', 'subjob_33'],
  avatar: 'https://randomuser.me/api/portraits/men/10.jpg',
  profileBack:
    'https://www.muchbetteradventures.com/magazine/content/images/2024/04/mount-everest-at-sunset.jpg',
};

export const ComponentProvider = ({ children }) => {
  const [myProfile, setMyProfile] = useState(myProfileMock);
  const [createdJobs, setCreatedJobs] = useState(testOffersList);
  const [activeThemeStyles, setActiveThemeStyles] = useState(LIGHT_THEME);
  const [currentJobId, setCurrentJobId] = useState(null);
  const [users, setUsers] = useState(testUsers);
  const [jobsList, setJobsList] = useState(testJobsList);

  const storeActiveTab = useRef(0);
  const jobsActiveTab = useRef(0);

  function getUserById(userId) {
    return users.find((user) => user.id === userId);
  }

  function removeJobById(id) {
    setCreatedJobs((prev) => prev.filter((job) => job.id !== id));
  }

  function editJobById(id, changes) {
    const job = createdJobs.find((jobItem) => jobItem.id === id);
    // Проверка на защиту от неточности тестовых данных
    if (!Object.keys(job).includes('history')) {
      job.history = [];
    }
    job?.history.push({
      type: 'Edited',
      date: new Date().toISOString(),
      changes: {
        ...changes,
      },
    });
    setCreatedJobs((prev) => {
      const filteredList = prev.filter((jobItem) => jobItem.id !== id);
      return [...filteredList, { ...job, ...changes }];
    });
  }
  return (
    <ComponentContext.Provider
      value={{
        myProfile,
        setMyProfile,
        createdJobs,
        setCreatedJobs,
        activeThemeStyles,
        setActiveThemeStyles,
        currentJobId,
        setCurrentJobId,
        users,
        setUsers,
        jobsList,
        setJobsList,
        getUserById,
        removeJobById,
        storeActiveTab,
        jobsActiveTab,
        editJobById,
      }}
    >
      {children}
    </ComponentContext.Provider>
  );
};

export const useComponentContext = () => useContext(ComponentContext);
