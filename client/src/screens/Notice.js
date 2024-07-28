import React, { useState } from 'react';
import axios from 'axios';
import "./notice.css";
import { useAppState } from '../AppStateContext';
import BackHandler from '../components/BackHandler';

const Notice = ({ onAddNotice }) => {
  BackHandler();
  const { isAdmin, notices } = useAppState();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [noticeStream, setNoticeStream] = useState(null); // State for stream
  const [noticeSemester, setNoticeSemester] = useState(null); // State for semester
  const [isNoticeGeneral, setIsNoticeGeneral] = useState(false); // State for general notice checkbox
  const [showAddNoticeForm, setShowAddNoticeForm] = useState(false); // State to control form visibility

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the form from submitting automatically

    try {
      // Find the maximum ID from existing notices
      const maxId = notices.reduce((max, notice) => (notice.id > max ? notice.id : max), 0);

      // Generate new ID by incrementing the maximum ID
      const newId = maxId + 1;

      // Construct the URL based on whether stream and semester are selected
      const streamSegment = noticeStream ? `/${noticeStream}` : '';
      const semesterSegment = noticeSemester ? `/${noticeSemester}` : '';
      const url = `https://biasportalback.vercel.app/api/notices${streamSegment}${semesterSegment}`;

      await axios.post(url, { title, body, newId });

      // Reset the form fields
      setTitle('');
      setBody('');
      setNoticeStream(null); // Reset stream
      setNoticeSemester(null); // Reset semester
      setIsNoticeGeneral(false); // Reset checkbox
    } catch (error) {
      console.error('Error adding notice:', error);
    }
  };

  const handleGeneralNoticeChange = (e) => {
    setIsNoticeGeneral(e.target.checked);
    if (e.target.checked) {
      setNoticeStream(null);
      setNoticeSemester(null);
    }
  };

  return (
    <div className='notice'>
      {isAdmin && <button className='adminbtn' onClick={() => setShowAddNoticeForm(!showAddNoticeForm)}>
        {showAddNoticeForm ? 'Cancel' : 'Add Notice'}
      </button>}
      {isAdmin && showAddNoticeForm && (
        <form className="notice-form" onSubmit={handleSubmit}>
          <div className="form-column">
            <div className="input-container">
              <input
                className="inputField"
                type="text"
                placeholder="Notice title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="input-container">
              <textarea
                className="inputField textareaField"
                placeholder="Notice body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                required
              ></textarea>
            </div>
          </div>
          <div className="form-column">
            <div className="input-container">
              <div class="checkbox-wrapper-46">
                <input type="checkbox" id="cbx-46" class="inp-cbx"
                  checked={isNoticeGeneral}
                  onChange={handleGeneralNoticeChange} />
                <label for="cbx-46" class="cbx"
                ><span>
                    <svg viewBox="0 0 12 10" height="10px" width="12px">
                      <polyline points="1.5 6 4.5 9 10.5 1"></polyline></svg>
                  </span>
                  <span>ALL</span>
                </label>
              </div>
            </div>
            {!isNoticeGeneral && (
              <>
                <div className="radio-inputs notice-radio">
                  <label className='radio'>
                    <input
                      type="radio"
                      name="stream"
                      value="CSE"
                      checked={noticeStream === "CSE"}
                      onChange={(e) => {
                        setNoticeStream(e.target.value);
                        setNoticeSemester(''); // Reset NoticeSemester value when changing stream
                      }}
                    />
                    <span className="name">CSE</span>
                  </label>


                  <label className='radio'>
                    <input
                      type="radio"
                      name="stream"
                      value="ECE"
                      checked={noticeStream === "ECE"}
                      onChange={(e) => {
                        setNoticeStream(e.target.value);
                        setNoticeSemester(''); // Reset NoticeSemester value when changing stream
                      }}
                    />
                    <span className="name">ECE</span>
                  </label>
                  <label className='radio'>
                    <input
                      type="radio"
                      name="stream"
                      value="MCA"
                      checked={noticeStream === "MCA"}
                      onChange={(e) => {
                        setNoticeStream(e.target.value);
                        setNoticeSemester(''); // Reset NoticeSemester value when changing stream
                      }}
                    />
                    <span className="name">MCA</span>
                  </label>
                </div>
                <div className="input-container">
                  <select
                    className="inputField"
                    value={noticeSemester || ''} // Ensure empty string if null
                    onChange={(e) => setNoticeSemester(e.target.value)}
                    required={!!noticeStream} // Only required if a stream is selected
                  >
                    <option value="">Select Semester</option>
                    {noticeStream === "MCA" ? (
                      <>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                      </>
                    ) : (
                      <>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                      </>
                    )}
                  </select>
                </div>
              </>
            )}
          </div>
          <div className="input-container">
            <button id="button" type="submit">Add Notice</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Notice;
