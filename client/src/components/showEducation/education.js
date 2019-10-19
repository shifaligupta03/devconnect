import React from 'react';
import Proptypes from 'prop-types';
import Moment from 'react-moment';

const showEducation = ({education, deleteEducation}) => {
  const handleDelete = eduId => {
    deleteEducation(eduId);
  };

  const showAllEducation = education.map(edu => (
    <tr key={edu._id}>
      <td>{edu.school}</td>
      <td>{edu.degree}</td>
      <td>
        <Moment format="YYYY/MM/DD">{edu.from}</Moment> -
        {edu.to === null ? (
          ' Now'
        ) : (
          <Moment format="YYYY/MM/DD">{edu.to}</Moment>
        )}
      </td>
      <td>
        <button
          onClick={() => handleDelete(edu._id)}
          className="btn btn-danger"
        >
          Delete
        </button>
      </td>
    </tr>
  ));
  return (
    <div>
      <h4 className="mb-4">Education Credentials</h4>
      <table className="table">
        <thead>
          {education.length ? (
            <tr>
              <th>School</th>
              <th>Degree</th>
              <th>Years</th>
              <th />
            </tr>
          ) : (
            <tr>
              <th>No Education Added</th>
            </tr>
          )}
          {showAllEducation}
        </thead>
      </table>
    </div>
  );
};

export default showEducation;

showEducation.proptypes = {
  deleteEducation: Proptypes.func.isRequired,
};
