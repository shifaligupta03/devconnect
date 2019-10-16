const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  company: {
    type: String,
  },
  website: {
    type: String,
  },
  city: {
    type: String,
  },
  province: {
    type: String,
  },
  status: {
    type: String,
    required: true,
  },
  skills: {
    type: [String],
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  bio: {
    type: String,
  },
  industryType: {
    type: String,
  },
  companySize: {
    type: String,
  },
  headquarters: {
    type: String,
  },
  founded: {
    type: String,
  },
  role: {
    type: String,
  },
  experience: [
    {
      title: {
        type: String,
        required: true,
      },
      company: {
        type: String,
        required: true,
      },
      location: {
        type: String,
      },
      from: {
        type: Date,
        required: true,
      },
      to: {
        type: Date,
      },
      current: {
        type: Boolean,
        default: false,
      },
      description: {
        type: String,
      },
    },
  ],
  education: [
    {
      school: {
        type: String,
        required: true,
      },
      degree: {
        type: String,
        required: true,
      },
      fieldOfStudy: {
        type: String,
        required: true,
      },
      from: {
        type: Date,
        required: true,
      },
      to: {
        type: Date,
      },
      current: {
        type: Boolean,
        default: false,
      },
      description: {
        type: String,
      },
    },
  ],
  social: {
    youtube: {
      type: String,
    },
    twitter: {
      type: String,
    },
    facebook: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    instagram: {
      type: String,
    },
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

ProfileSchema.plugin(uniqueValidator, {message: '{PATH} must be unique'});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
