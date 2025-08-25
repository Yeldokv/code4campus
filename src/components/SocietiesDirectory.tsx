import React, { useState } from 'react';
import { Users, Mail, Phone, MapPin, Calendar, Search, ExternalLink, User } from 'lucide-react';

interface Society {
  id: string;
  name: string;
  acronym: string;
  description: string;
  category: 'technical' | 'cultural' | 'sports' | 'academic' | 'social' | 'professional';
  establishedYear: number;
  memberCount: number;
  president: string;
  contactEmail: string;
  contactPhone?: string;
  meetingLocation: string;
  meetingTime: string;
  activities: string[];
  achievements: string[];
  websiteUrl?: string;
  logoUrl?: string;
}

const societies: Society[] = [
  {
    id: '1',
    name: 'Computer Society of India',
    acronym: 'CSI',
    description: 'Leading technical society focused on computer science, programming competitions, workshops, and industry connections. We organize hackathons, coding bootcamps, and tech talks.',
    category: 'technical',
    establishedYear: 2010,
    memberCount: 150,
    president: 'Sarah Johnson',
    contactEmail: 'csi@campus.edu',
    contactPhone: '+91 1234567890',
    meetingLocation: 'CCF Lab, CS seminar hall',
    meetingTime: 'Every Friday, 4:00 PM',
    activities: ['Hackathons', 'Coding Competitions', 'Tech Workshops', 'Industry Guest Lectures', 'Open Source Projects'],
    achievements: ['Best Technical Society 2023', 'Organized 15+ successful events', 'Winner of Inter-University Hackathon'],
    websiteUrl: 'https://csi-campus.org',
    logoUrl: 'data:image/png;base64,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'
  },
  {
    id: '2',
    name: 'Institute of Electrical and Electronics Engineers',
    acronym: 'IEEE',
    description: 'Professional society for electrical and electronics engineering students. We focus on advancing technology for humanity through technical projects and professional development.',
    category: 'professional',
    establishedYear: 2012,
    memberCount: 120,
    president: 'Michael Chen',
    contactEmail: 'ieee@campus.edu',
    contactPhone: '+91 1234567890',
    meetingLocation: 'Electronics Lab, Building B',
    meetingTime: 'Every Tuesday, 3:30 PM',
    activities: ['Technical Seminars', 'Project Exhibitions', 'Industry Visits', 'Research Publications', 'Career Guidance'],
    achievements: ['IEEE Student Branch of the Year 2023', 'Published 25+ research papers', 'Organized International Conference'],
    websiteUrl: 'https://ieee-campus.org',
    logoUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACoCAMAAABt9SM9AAABKVBMVEX///8BUqH///3+/v8AU6ABUqIAR5DL3uz8/////vvV5vEAU58FUKAATqIASpcAU52GqMkAQ5JFeKnf7vjV5/hCcqd1l7yRss/o+v0ATZkAQpT2//8DUaVrlbsARZQrZKAASaAPUZD///cAUKcARYsARZL/+v8AQojv+f4AUIuZuM+x1OkEU5n//fEAP5J1l7/B0+UsYKMAQZooZZphiaxTfagAQ4OexN1ghrJ5nLzM6fTp7/Brir1LbZgANHcpVpI6Z6IAN4Oltdhql7auxdlagrKGrMeMueKRr9LN2u+0yNRokLmJn7Z2ma6Jos4lYY0ASoSpy+bD4/MYYKGs2em9z+kAOZZPerWeuspihr40app5rM8AR6mZyOIkWYlWgKGx3fZpn9XC4OO27acWAAASf0lEQVR4nO2ci1/bxpbHR4+RR9JIY+NgW5qJsCXLNkY8AoSA2zRkC9mk5DYN3DS9bG/ubv//P2LPyAYMSMYmbR7NfD9tYjs+mtHPM2fOmYcQUigUCoVCoVAoFAqFQqFQKBQKhUKhUCgUCoVCoVAoFArFF4COyOeuwleCrtuAbnzuenwV2LGOOAK5PndFvgJ0W28d7OyOSPy5a/IVoNutxzWNrjqfuyJfOIauG0bMG6lgib/csg1uKM9VhhTLJsMu1jSsWQ+5clsz0JFh6Gt7LtaEm2nhE7tHlFxl6Kinj7IAYw27TCSdU6TaVim2obdWqIYpZVhomZfV7a/PZ32KGhMIrOy49djPmIkF/I9N198ZxD0S3128LqMzGxm2fgHRY5KPDvCHTbg+LzZY6pMKxWQ+G5KH0dLKkGaGHqP5DA3dlt9cXCzwVz2D79ZYIrLMa3sacxmOlloQot55NfkNEBtN1TFej+1xykQMeD1X3REhSAe78Y9j59LNZSfFImQiFoTU84qFcpkXFws0tmN+sJGwjtn29w9OViIPJyI64eu9ObQ3DPKdc43RiNvjK3Nn5CwAiC7L0+P6aLSA4UCORSCW/t3d353iu3uJRXrr/EU/0Vy68X0dPuBbTy2hBd0DbsxzNQM1atYUXWvPsSc3/UPateYhTVMreiZ/7fyShxu1aE47y3ruECjOAJ2bzyMrnc+ua9V+XHgMkw0enFMzxGbmZ0do8F/fN7Y4b1qUahsvCDIm1Z8p1mZkaleYwp+kAHq9JlxtTjDd4ZMUXl+i5t0GYyvNrDnS10nLZiQg9pkL1/UPFhXLsGPZB3/bS1z31/0BquxseO3a4xGqrESmSIfS187siuBjbbTpm1N3hzX/wVhhu17T5r1rTRMrPB8vgGVvTjsYjLSagyZDQ9PC85aHtXZjUbFiwo0eOoqwm1hNRA5CjzEXt7tDQn60giQcEqMXz0qrP7NYsrRPJpYN45V+FCXYWnmFXh2mCXYFyzCtHQ9Qs6u5YZPHMwOuXKzGtyGW3ov52y52+/st8tJKhAsuxoXGJbxnW+i0Y7H0BdFnTZ3+VWLhObvhJxKLyHgmNsiTyAy6VTTY3YCCQKyM4QDD33tN9N1yyDaqHDybXTYHcSGWhqfqUSyWCS/pJfga8hMp1mQ4uSYWXFt4uBh5nbBcLIyFpMAOZ94iYkHUrXODDFNXREfg2SPZrFzm/3cmXCGHi/4JbzVC3G3AyKyXXXciFnYxvkss2Wo1doF7gSnJ3+7wmBS0LKxNffsG8kqWFMu+LRbUyHRLLDVhtjcXEcsg0MNeprjdqaAjXwgK19a0M/44kc0E2kG0VIfR2AwbLaM0fltALHhlXrUqcRMvWSGTyP+6WJCqZu6tr48BRUpblimHynGBN6woDUytvUjoQAx7HVX3hH/uoOq2zHGExrDfQEdh3vRpQv3OK/RTTWuftNbv6IbziCVTzsC/ILiFd8aRXtCyXJN67dtfH+NT/7mj20ViMVejZWXBh9uLtCzId/lJisPHLb67jTPoga7GtH7FHmQBVFUI18SBdYTeBSx63LJLxsTFxAoOG5ubm43bbEpeE0KKfJagnYcFNhPDRqNuF4qFtWz/oNTsHw+P5k134Npx3Hoc0XCX15cjYULka5pukh1CVziI8rJc2cBqL3UnC/zlOjIKY4hFxNKw/3B2rQpHQ7h2h991N0UOntZO7yhuLrGIvHj93MLbB2T0xtImd2riqAkXqKT0qg/UfiZOh3pv/oCMuaDKC4gF3sd/SGw0R3J+XSw2WyxjXA90y2dpYWUyxfBREIjKK6uesKrI6fjmxY2arF2PIapf8q66DtveJM6HxFtdQzG/3bS+ALEm9UB/lVh2TI5+CZJ+k5x2kkSO3uPL+/sohlAH0p+LiiYZq53w+rN20h3yXlElP4FY9HOJlVsSXk2pqL1Er7o0wBDGmPmt0nANggRiDLLLfogT093Y5/UOw9ubclbgRsmLioW+qpYlb0NvHVtaUhuiSmCaV3epJR8GBsSpcPfQtMzLz93omD/I3CRcqusyOptOfxYXiyws1p0OHhWLRUGse6o0gcfrpLLS7rDtJtrqmhDMXokVvoBeaMSx7uyZU/NCrhl+D/2Val62hvTYnr7bv7dYdsybKWVJrYpeZdS99FeS6K3jQMNxTk+Xr92jlqWbaMty3aBW5bZhT80HftlinX7scl59PxU029gko8y7alb5vQor7LfiwS+1PtPYVNuiWgbaDtMAZ+33I6J/NWLdt2XJVFjOtqx1Iii9vYvqq1AjyL9BC4xTK4ugu7Ek4/EgSyDp2vMSAV/UEmpmuI1ZOISkCEJ8L3vLY8OA3riwWFgGpbZuFGBDa7WvXPFtB19kZBg9+8InFKU7IjyNi+0Mfbq0m8A/Q/+K7dZBn2LT9A9brZVAw9K9Y81LV5qVerXbFkw844ifuVQ7a+6v1qIgYJ42mda2tsixn2FhdndbOvi1cVmLJNIg1kmrxQetAgaDwZQzvJ7uQOhQZDKB6CViZUn6z8Ky8vK4jcpWFww5xWCTrQ++nCqhz+pkyYdf2mXgkNKlNS4X0eonLBOPuE4OA4r3ThFxnjSWNZoxIRXIRNfh522cuaydgUHPGK/gLNSyIJG2LL+AvW7/tV4iFrw0O0VGQHfvDS8TSxNs1YqK7bIfnBkTwCCVPXiY0gxak5tu6d+HTDYqZgar0K3WY0K48+RRRg8hLlh2ReKfIM4RaUSCsTzoMjVvZ+B03UzAT909rpO4t3g3lBNMzGW3oUm7iuISseScToGNBCcr4zXKArEoZWZiFtuZYcUmZTPA0AXJ2jMLuqDrCh+cdYjZ+LqdkQwG0GC4k0aUecuQah2b2KTm/ofVRp0M9/BYBlPD1r/QkQXFaxQkbvKFW5aUi+Kbk6Q5ruaXimUKYWolM6UuiFXWsuA1ZSWGWq2ily6KQsNaSz1MXQZdj7UGHXBFeUXSt+AjY7u+E3lQJ+YdI53sUxl+BRBXdbfQuz1T5G0amtivW3w5kDN4Jha/VvXFxZJe0rz+yRhXi6qopBtqU2HzbbtHpS1LwkrsTMvRS/dU6TFaDhjLzATj4D3aCqHt5BfbG0EP1Pm5z1wssCnFQide3ppwxuiyjpa8vHwYNvF2A70MpB1mrrfaWrQbzsDU2uVizcKdLVYZeJZY0F6aGwmGTsyEe0icbTkvCiTdNUiq48EqxAlww6Z3AqMcJDtYzr3ipHaik6V2/vPAUIC9hv3zOGsENXe+CLHMv0AsuV90M6Tg0bOEpacccsOxWHRlpNuxvdVJqVw18DaRbVcjGYdqQRQ1BmStP5bHpZj1K61sXEUR/bKVDyefW6x7tixtllh2bPTIP99ECQz84MV5XUbvQCba2XDAY73eXLaiNAg3YYyohprvp9bhgYP4b76Zhw4aFeZeFb3YhsAe3HRWHcgNPn+WWHDRGWLN2L5ggs8qDR3uK1Z+PXvQgPYD3ieUmZ6M9uSuSBx1Nrc4DKP1rebm0vLTp09XVpZOmlt1gurDHTnDDMOXCZK1H5NXcoOui6MlB02SngVHQ7N4acoUzPt5KqK+JhbDFMKdYjKxUx46MCbK7HC3gmYuHiO+bm+tBHJdqTZEby0Y38Z3IHzr7OQ3Z5AbEy6FQ7x+dHDejYQb5GJBKuTttAZnEHvgZA/ChosgZcE4C3vFmGZYnUoabwSlzA1K7JL2Dl8vEUuAk6Uldl7/rrRRTuy1Gv1EMJpuoWYNu+P9QJCHiHY77J69/9dmo/H69T92l1a6tShqJ2ZHfkWuIrqiI6N+SH2s8wqx44tUYcEI/myphPeHQ71ELOGybLnMbnmX90rEcrF7/rjM7KlzxxbQXo/o6+QtuCtTZA9Qoz+JQiCols2HQiS198J59WDYp3LFO8vkepibB0cu7VTQSeRmbv9gYI832pEFxZK54UNokQWRM+GEx3GJWKYp8lmHol4D3SAu64ZMWKdlUTrY3bEOJhsEXLu+1DZZG9LDh76Qcw5UroLlsSIV4ZEdo0o/j3KTBGJYOd+FXRPSaHTQhhitI6f/5MQBWjiRHs86FO+sNQyb9ErEgninc+HFb2wMzZPestUdLZFTNMU7SuEujTlWDUExXrWoae0MyH6EzemdeSaLjuBKFUubxnTltjbSDIUbLddv5Or3mc+6s45/4hz83WXNxIjX0TuWsfbywNi3TIi8Li9PWbQFejvWjcFapEeQTUKAdsDX4+v1/iRifcTqzr0kusRGnBjx6HA7iJYHfN+SWeqUWBXwHPUunSoRQg3Q6miD+dYT8C037vXvLRaBEB2GxdZJH/tPB3w3pVcdUbgpiGXXrWmxqCfbVQr99oEe33KYf3+xZBRBXvYD67xFGparTUIIeR7MsXW7leHxO/BWrplY71Bzg0ZLrXWCbu3T+pLXDT9+dWcCDCFrmRe9qaOq3PE3vlVMrTrkHBOx8k9EklVAK5Y2Wh+7MeSTL9//aWKBn9dPnyXB2QPU7DJ8IVY2gIGVP7qY7oMssOOgaorbzZLNTN+GWNAf1+vnNdlwnuyxC7E6A4iD+GFemFwns96M0OZG4q/ls/gFM/yfqhveZfMXiyVPCA2WutQ6gg5J86QGB2dywzBZzt/B/adywEzpaiWfwy+6y4XFmsVlN1+sZY1nP1DRIutsBRY7c2fwfd9Mq6i+44tEQFZz9uRoa+vtCqSCkLPTjRM+ONz2nzmQJZXkDQuJhen7F0C1hKE8GnZbLIZF9j9lNsBBS55CK5qDt05Ky4Ja/LTgQSeD80ZEQ9DkOHXlXj8apWEYUirPWSQbTTTaWfV2RnzGDOxi81mQsLfbBUtTciJg+xG/yKWvz2eZjKUlS2Fg2N5woI8U7FaGMT6fYGh7hZYL7Skd347ND2pmdFgHNy8wDH4CM9PNGGbMW/0Jvduj3nkrvh1e3VcsDXJNd2o3/AUyO6Urcqn7tljUzXBy2+TSNHRQoVhy/3wiL1xUnpZFi5+wIJAp1rIge4XWVgNZFKUiSbCJrfMReVkT/mErNmxU6pUXXd2RI+w4b79Gvpa3QwrFyrP62yYTO5eljsx4C7ohvlihvG2HBV5oH3wOkedyX2wnwS9DVH9fc+WWYpZljKYNPtjfcIP8EQ+kfFZx0ZY1+V1vIj9NHl0mUzemlUXpkpbc4b4hxRo7eF+7Vp7rlpUH7dtb+Agdkk904NWI4o0G59Wuh+URaSxP7jjnXewvDYhtz3F2B09t8/qMZ3farpizPKwtdBzlEsLRQQ1n/qGDKs9SGKhFbX+Ahns08JcHxLDnOej0ucTSPrVYeqyjRsjo7/6QGwdBaJ0fofrjmsDe+QDd9YCoiVjatyIWQrHNGyHOIFmukFbF4fxJx0twsFO/OxK5FOvj1g1vizWv1ScXyyaEH3ud3wW1dh3eWnua0gD8Vh1Bm6sPX784nfEUHx1a3oGvTdacTHCdGcvGB8pBLEvk+zAnY9D4BNjVO+3yjbQVZ3x8Uk/Xl5LJ59rl96c+mL4UvJdijWPxZupi92rI07Rp42uXgt8CxLrvPma7tdPOMg37aRaEbfh9aOeBbayjo/6P/375y0MSl+7P0RFpbIRhWqvVoggi2lq4/fzB5Nv1H9J+OKaW/xfWauH0i4t3EVD7wPXxj0ION+S/Xf/KFdOXgr+eO4Y9Nnz5PAprk4+vl3bjXRhZ6Ubjfkqh/LECHUY1JpI8dpCbIFBMYmfv38f/2f3fDy9L0yj4cYhTucZphcfjBYYBvJ6fP4zJNnvbOR0tYDcw5GOH5GH/BYwqle/unWUbPfuPKNFY5lJPCM3sHhEEYc/LQ549ePj6yRmPS7Sy8+2quvxDPuhEzx/E0evl3Sl/8slcD/DIHzVILmLfSWecE5sbKH+eC7Hne8yIfrEwdV+xwG0ZT7pyF3d+pDGSj3TgdtzYb3VWduprq4OyRNqWp4eJXJGa2k47mVA1oIWRki2wt0HGZA0QyRV5e14zPX84y7j/zl0WGMUfNX1joOaeEOC3Mvz7Q9ST0TQ56rQ6o7RVXSYF53ZK0e//o03s0Xyn2z6miI8rwDD4sdURZpa0zyHJgeraZJD92OTv/q//U6mD/2aBIZFiLfu905LHnQyISO3Rfz48PnyzhtSzS29C4tPINd3+FnhKGVrJbW6k/ofTig3VsG6ix+TF81o6JLZMCeX4Qvi6gXq6QQrOZX7rwLg2GlaIPt3p9LwLKq1uIR8lZ8+aGFVckT/Z7V6Pd/sm0eWBKKXVHIwTMyWVQqFQKBQKhUKhUCgUCoVCoVAoFAqFQqFQKBQKhUKhUCgUCoVCoVAoFAqFQqFQKBQKhUKhUCgUCsVc/D9EtimDx0aeHAAAAABJRU5ErkJggg=='
  },
  {
    id: '3',
    name: 'Drama and Theatre Society',
    acronym: 'DTS',
    description: 'Creative society dedicated to theatrical arts, drama productions, and performing arts. We stage original plays, classics, and organize drama workshops for students.',
    category: 'cultural',
    establishedYear: 2008,
    memberCount: 80,
    president: 'Emma Davis',
    contactEmail: 'drama@campus.edu',
    meetingLocation: 'Auditorium, Main Building',
    meetingTime: 'Every Thursday, 5:00 PM',
    activities: ['Drama Productions', 'Acting Workshops', 'Script Writing', 'Stage Management', 'Costume Design'],
    achievements: ['Best Play Award 2023', 'Performed at State Festival', 'Trained 200+ students in acting'],
    logoUrl: 'https://images.pexels.com/photos/713149/pexels-photo-713149.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: '4',
    name: 'Basketball Club',
    acronym: 'BBC',
    description: 'Premier sports society for basketball enthusiasts. We participate in inter-university tournaments and organize training sessions for all skill levels.',
    category: 'sports',
    establishedYear: 2015,
    memberCount: 45,
    president: 'David Wilson',
    contactEmail: 'basketball@campus.edu',
    contactPhone: '+1-555-0104',
    meetingLocation: 'Sports Complex',
    meetingTime: 'Daily, 6:00 AM & 6:00 PM',
    activities: ['Daily Training', 'Inter-University Matches', 'Coaching Clinics', 'Youth Outreach Programs', 'Fitness Workshops'],
    achievements: ['Regional Champions 2023', 'Undefeated home season', 'Developed 15+ professional players'],
    logoUrl: 'https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: '5',
    name: 'Photography Club',
    acronym: 'PC',
    description: 'Creative society for photography enthusiasts, organizing photo walks, exhibitions, and workshops on various photography techniques and digital editing.',
    category: 'cultural',
    establishedYear: 2018,
    memberCount: 65,
    president: 'Lisa Anderson',
    contactEmail: 'photo@campus.edu',
    meetingLocation: 'Art Studio, Building C',
    meetingTime: 'Every Saturday, 2:00 PM',
    activities: ['Photo Walks', 'Photography Workshops', 'Annual Exhibition', 'Digital Editing Sessions', 'Nature Photography'],
    achievements: ['Best Photography Exhibition 2023', '1000+ photos in gallery', 'Featured in local magazines'],
    logoUrl: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: '6',
    name: 'Environmental Club',
    acronym: 'EC',
    description: 'Dedicated to environmental conservation and sustainability initiatives. We organize tree plantations, clean-up drives, and awareness campaigns about environmental issues.',
    category: 'social',
    establishedYear: 2016,
    memberCount: 90,
    president: 'James Rodriguez',
    contactEmail: 'environment@campus.edu',
    meetingLocation: 'Conference Room, Library',
    meetingTime: 'Every Wednesday, 4:30 PM',
    activities: ['Tree Plantation', 'Clean-up Drives', 'Awareness Campaigns', 'Recycling Programs', 'Solar Energy Projects'],
    achievements: ['Planted 1000+ trees', 'Reduced campus waste by 30%', 'Green Campus Certification'],
    logoUrl: 'https://images.pexels.com/photos/1072179/pexels-photo-1072179.jpeg?auto=compress&cs=tinysrgb&w=300'
  }
];

const categoryColors = {
  technical: 'bg-blue-600',
  cultural: 'bg-purple-600',
  sports: 'bg-green-600',
  academic: 'bg-indigo-600',
  social: 'bg-teal-600',
  professional: 'bg-orange-600'
};

const SocietiesDirectory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSociety, setSelectedSociety] = useState<Society | null>(null);

  const filteredSocieties = societies.filter(society => {
    const matchesSearch = society.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         society.acronym.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         society.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || society.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Users className="w-8 h-8 text-blue-400" />
        <div>
          <h1 className="text-3xl font-bold text-white">Campus Societies Directory</h1>
          <p className="text-gray-400">Discover student organizations and join communities that match your interests</p>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="text-2xl font-bold text-blue-400 mb-1">{societies.length}</div>
          <div className="text-gray-400 text-sm">Active Societies</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="text-2xl font-bold text-green-400 mb-1">
            {societies.reduce((sum, s) => sum + s.memberCount, 0)}
          </div>
          <div className="text-gray-400 text-sm">Total Members</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="text-2xl font-bold text-purple-400 mb-1">
            {Object.keys(categoryColors).length}
          </div>
          <div className="text-gray-400 text-sm">Categories</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="text-2xl font-bold text-yellow-400 mb-1">
            {Math.round(societies.reduce((sum, s) => sum + s.memberCount, 0) / societies.length)}
          </div>
          <div className="text-gray-400 text-sm">Avg. Members</div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search societies by name, acronym, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              All Categories
            </button>
            {Object.keys(categoryColors).map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors capitalize ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Societies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSocieties.map((society) => (
          <div
            key={society.id}
            className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
            onClick={() => setSelectedSociety(society)}
          >
            {society.logoUrl && (
              <img
                src={society.logoUrl}
                alt={society.name}
                className="w-full h-48 object-cover"
              />
            )}
            
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <span className={`px-2 py-1 rounded text-xs font-medium text-white ${categoryColors[society.category]}`}>
                  {society.category.charAt(0).toUpperCase() + society.category.slice(1)}
                </span>
                <div className="text-gray-400 text-sm">
                  Est. {society.establishedYear}
                </div>
              </div>
              
              <div className="mb-3">
                <h3 className="text-lg font-bold text-white mb-1">{society.name}</h3>
                <div className="text-blue-400 font-semibold text-sm">{society.acronym}</div>
              </div>
              
              <p className="text-gray-300 text-sm mb-4 line-clamp-3">{society.description}</p>
              
              <div className="space-y-2 text-sm mb-4">
                <div className="flex items-center space-x-2 text-gray-400">
                  <Users className="w-4 h-4" />
                  <span>{society.memberCount} members</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-400">
                  <User className="w-4 h-4" />
                  <span>President: {society.president}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-400">
                  <Calendar className="w-4 h-4" />
                  <span>{society.meetingTime}</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">
                  View Details →
                </button>
                <div className="flex items-center space-x-2">
                  <button className="p-1 bg-gray-700 hover:bg-gray-600 rounded">
                    <Mail className="w-4 h-4 text-gray-400" />
                  </button>
                  {society.contactPhone && (
                    <button className="p-1 bg-gray-700 hover:bg-gray-600 rounded">
                      <Phone className="w-4 h-4 text-gray-400" />
                    </button>
                  )}
                  {society.websiteUrl && (
                    <button className="p-1 bg-gray-700 hover:bg-gray-600 rounded">
                      <ExternalLink className="w-4 h-4 text-gray-400" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredSocieties.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400 text-lg">No societies found matching your search criteria.</p>
        </div>
      )}

      {/* Society Details Modal */}
      {selectedSociety && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl p-6 max-w-4xl w-full border border-gray-700 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                {selectedSociety.logoUrl && (
                  <img
                    src={selectedSociety.logoUrl}
                    alt={selectedSociety.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                )}
                <div>
                  <h2 className="text-2xl font-bold text-white">{selectedSociety.name}</h2>
                  <div className="flex items-center space-x-3">
                    <span className="text-blue-400 font-semibold">{selectedSociety.acronym}</span>
                    <span className={`px-2 py-1 rounded text-xs font-medium text-white ${categoryColors[selectedSociety.category]}`}>
                      {selectedSociety.category.charAt(0).toUpperCase() + selectedSociety.category.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedSociety(null)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white mb-3">About</h3>
                  <p className="text-gray-300">{selectedSociety.description}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-bold text-white mb-3">Contact Information</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-gray-300">
                      <User className="w-4 h-4 text-blue-400" />
                      <span>President: {selectedSociety.president}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-300">
                      <Mail className="w-4 h-4 text-blue-400" />
                      <span>{selectedSociety.contactEmail}</span>
                    </div>
                    {selectedSociety.contactPhone && (
                      <div className="flex items-center space-x-2 text-gray-300">
                        <Phone className="w-4 h-4 text-blue-400" />
                        <span>{selectedSociety.contactPhone}</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-2 text-gray-300">
                      <MapPin className="w-4 h-4 text-blue-400" />
                      <span>{selectedSociety.meetingLocation}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-300">
                      <Calendar className="w-4 h-4 text-blue-400" />
                      <span>{selectedSociety.meetingTime}</span>
                    </div>
                    {selectedSociety.websiteUrl && (
                      <div className="flex items-center space-x-2 text-gray-300">
                        <ExternalLink className="w-4 h-4 text-blue-400" />
                        <a href={selectedSociety.websiteUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                          Visit Website
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-gray-750 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">Quick Facts</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Established:</span>
                      <p className="text-white font-medium">{selectedSociety.establishedYear}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Members:</span>
                      <p className="text-white font-medium">{selectedSociety.memberCount}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white mb-3">Activities</h3>
                  <div className="space-y-2">
                    {selectedSociety.activities.map((activity, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <span className="text-gray-300">{activity}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-bold text-white mb-3">Achievements</h3>
                  <div className="space-y-2">
                    {selectedSociety.achievements.map((achievement, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                        <span className="text-gray-300">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setSelectedSociety(null)}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
              >
                Close
              </button>
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
                Join Society
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SocietiesDirectory;