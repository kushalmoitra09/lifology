import { gql } from "@apollo/client";

export const SchemeSendOTP = gql`
  mutation SendOTP($country_code: String!, $mobile_number: String!) {
    sendOtp(country_code: $country_code, mobile_number: $mobile_number)
  }
`;

export const SchemeVerifyOTP = gql`
query otpVerification($country_code: String!, $mobile_number: String!, $otp: String!){
  otpVerification(country_code: $country_code, mobile_number: $mobile_number, otp: $otp){
    is_user_exist
    auth_token
  }
}
`;

export const SchemeGetGrades = gql`
query{
  grades{
    id
    grade
    streams {
        id
        stream
    }
  }
}
`;

export const SchemeGetPref = gql`
query{
  preferences{
      id
      title
      description
      image
  }
}
`;

export const SchemeGetCareerFamilies = gql`
query {
  careerPools(lang_id:1,filter:{fitment:true,order:"myfitment"}){
    id
    name
    image
    one_liner
    description
    video
    thumbnail
    percentage
    personality_match
    orientation_match
    }
}
`;

export const SchemeSignUp = gql`
mutation signup($mobile_number: String!, $email:String!, $name:String!, $child_name:String!, $gender: String!, $grade : String!, $stream_id:Int, $preferences:String!){
  signup(country_abbr:"IN",country_code:"91",mobile_number:$mobile_number,email:$email,name:$name,child_name:$child_name,gender:$gender,grade:$grade,stream:null,stream_id:$stream_id,preferences:$preferences,signup_type:"NORMAL",social_id:"",time_zone:"asia/kolkata") {
   id
    email
    country_code
    mobile_number
    signup_type
    social_id
    auth_token
    time_zone
    name
    child_details {
      id
      user_id
      child_name
      gender
    },
  }
}
`;

export const SchemeGetProfile = gql`
query{
  profile{
    id
    country_abbr
    email
    signup_type
    social_id
    auth_token
    time_zone
    name
    profile_image
    country_code
    mobile_number
    child_details{
      id
      grade
      child_name
      user_id
      gender
      stream
      stream_id
      school_name
    }
    
  }
}
`;

export const SchemeEditProfile = gql`
mutation editProfile($profile_image:String,$country_abbr:String!, $email:String!$country_code:String!,$mobile_number:String!, $name:String!, $child_name:String!, $gender:String!, $grade:String!, $stream:String!, $school_name:String!, $stream_id:Int!){
  editProfile(editProfileInput:{profile_image:$profile_image,country_abbr:$country_abbr,email:$email,country_code:$country_code,mobile_number:$mobile_number,name:$name,child_name:$child_name,gender:$gender,grade:$grade,stream:$stream,school_name:$school_name,stream_id:$stream_id}){
    id
    country_abbr
    email
    name
    signup_type
    social_id
    auth_token
    time_zone
    name
    profile_image
    country_code
    mobile_number
    child_details{
      id
      user_id
      child_name
      gender
      grade
      stream
      school_name
    }
  }
}
`;

export const SchemeGetVideos = gql`
query{
  videos(lang_id:1){
    id
    name
    videos{
    id
    lang_id
    title
    description
    category_id
    tags
    views
    video
    thumbnail
    watch_later_status
    favorite_status
      chapters{
        id
        video_id
        title
        video
        thumbnail
      }
    }
  }
}
`;

export const SchemeGetUniversityCountry = gql`
query{
  universityCountry{
      country
  }
}
`;

export const SchemeGetUniversityState = gql`
query{
  universityState(country:"India"){
      state
  }
}
`;

export const SchemeGetUniversityCity = gql`
query{
  universityCity(state:"Uttar Pradesh"){
      city
  }
}
`;

export const SchemeGetAllUniversity = gql`
query{
  allUniversity(lang_id:1,filter:{pool_id:1,field_id:1,ranking:"Times Rank"}){
    title
    university{
    id
    name
    description
    website
    logo
    city
    state
    country
    }
  }
}
`;

export const SchemeGetUniversity = gql`
query universityDetails($id: Int!){
  universityDetails(id:$id,lang_id:1){
    id
    name
    description
    website
    logo
    city
    state
    country
    qs_ranking
    times_ranking
    guardian_ranking
    approval
    established
    ownership
    type
    bookmark_status
    career_courses {
      id
      name
      college_id
      duration
      eligibility
      fee
      fee_unit
      seats
    }
  }
}
`;

export const SchemeGetVideo = gql`
query videoDetails($id:Int!){
  videoDetails(id:$id){
    id
    lang_id
    title
    description
    category_id
    tags
    views
    video
    thumbnail
    watch_later_status
    favorite_status
    chapters{
      id
      video_id
      title
      video
      thumbnail
    }
  }
}
`;

export const SchemeGetRecommendedVideos = gql`
query{
  recommendedVideo{
    id
    lang_id
    title
    description
    category_id
    tags
    views
    video
    thumbnail
    watch_later_status
    favorite_status
    chapters{
      id
      video_id
      title
      video
      thumbnail
    }
  }
}
`;

export const SchemeCareerPools = gql`
query{
  careerPools(lang_id:1,filter:{fitment:true,order:"myfitment"}){
    id
    name
    image
    one_liner
    description
    video
    thumbnail
    percentage
    personality_match
    orientation_match
  }
}
`;

export const SchemeCareerFields = gql`
query careerFields($pool_id:Int!){
  careerFields(lang_id:1,pool_id:$pool_id){
    id
    pool_id
    name
    image
    description
    video
    thumbnail
    topics
    {
        name
        image
    }
    skills
    {
        name
        image
    }
    employment_areas
    {
        name
        image
    }
  }
}
`;

export const SchemeGetUniversities = gql`
query allUniversity($pool_id:Int!,$field_id:Int!){
  allUniversity(lang_id:1,filter:{pool_id:$pool_id,field_id:$field_id,ranking:"Times Rank"}){
    title
    university{
    id
    name
    description
    website
    logo
    city
    state
    country
    }
  }
}
`;

export const SchemeGetAssessments = gql`
query{
  assessments{
    id
    title
    subtitle
    dash_cards_image
    mychild_image
    instruction
    icon
    lang_id
    assessment_type
    description
    assessment_status
    total_questions
    attempted_questions
    questions_count
    reports{
      id
      title
      image
      description
      label_query{
        id
        label
        query
        description
      }
    }
  }
}
`;

export const SchemeGetAssessment = gql`
query assessmentDetails($id: Int!){
  assessmentDetails(id : $id){
    id
    title
    subtitle
    dash_cards_image
    mychild_image
    instruction
    icon
    lang_id
    assessment_type
    description
    assessment_status
    total_questions
    attempted_questions
    questions_count
    reports{
      id
      title
      image
      description
      label_query{
        id
        label
        query
        description
      }
    }
  }
}
`;

export const SchemeGetAssessmentQuestion = gql`
query assessmentQuestions($assessment_type:Int!, $assessment_id:Int!){
  assessmentQuestions(assessment_type:$assessment_type,lang_id:1,assessment_id:$assessment_id,platform:"WEB"){
    id,
    assessment_id
    lang_id
    question_title
    total_questions
    attempted_questions
    score_options{
      label
      score
    }
  }
}
`;

export const SchemeAnswerAssessmentQuestion = gql`
mutation assessmentAnswer($assessment_type:Int!, $assessment_id: Int!, $question_id: Int!, $scores: [Int!]!){
  assessmentAnswer(assessment_type:$assessment_type,assessment_id:$assessment_id,lang_id:1,question_id:$question_id,scores:$scores)
}
`;