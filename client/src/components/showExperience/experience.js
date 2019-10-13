import React from 'react';
import Proptypes from 'prop-types';
import Moment from 'react-moment';

const showExperience = ({experience, deleteExperience}) => {
  const handleDelete = expId => {
    deleteExperience(expId);
  };

  const showAllExperiences = experience.map(exp => (
    <tr key={exp._id}>
      <td>{exp.company}</td>
      <td>{exp.title}</td>
      <td>
        <Moment format="YYYY/MM/DD">{exp.from}</Moment> -{exp.to || ' Now'}
      </td>
      <td>
        <button
          onClick={() => handleDelete(exp._id)}
          className="btn btn-danger"
        >
          Delete
        </button>
      </td>
    </tr>
  ));
  return (
    <div>
      <h4 className="mb-4">Experience</h4>
      <table className="table">
        <thead>
          {experience.length ? (
            <tr>
              <th>Company</th>
              <th>Title</th>
              <th>Years</th>
              <th />{' '}
            </tr>
          ) : (
            <tr>
              <th>No Experience Added</th>
            </tr>
          )}
          {showAllExperiences}
        </thead>
      </table>
    </div>
  );
};

export default showExperience;

showExperience.proptypes = {
  deleteExperience: Proptypes.func.isRequired,
};
