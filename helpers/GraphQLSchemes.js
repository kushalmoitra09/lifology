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

export const SchemeAddWatchLater = gql`
mutation videosBookmark($video_id: Int!,$bookmark_type: String!, ){
  videosBookmark(video_id:$video_id,bookmark_type:$bookmark_type)
    {
      bookmark_status
    }
    
  }
`;

export const SchemeAddBookmark = gql`
mutation videosBookmark($video_id2: Int!,$bookmark_type: String!, ){
  videosBookmark(video_id:$video_id2,bookmark_type:$bookmark_type)
    {
      bookmark_status
    }
    
  }
`;


export const SchemeAddLike = gql`
mutation videosLikeStatus($video_id: Int!){
  videosLikeStatus(video_id:$video_id,like_status:1)
  {
    like_status
  } 
  }
`;

export const SchemeAddDislike = gql`
mutation videosLikeStatus($video_id: Int!){
  videosLikeStatus(video_id:$video_id,like_status:0)
  {
    like_status
  } 
  }
`;

export const SchemeGetWatchLaterVideos = gql`
query{
  videosWatchLater(filter:{search_keyword:"",page:1}){
  id
  lang_id
  title
  description
  category_id
  tags
  views
  video
  thumbnail
  }
}
`;


export const SchemeNoAction = gql`
mutation videosLikeStatus($video_id: Int!){
  videosLikeStatus(video_id:$video_id,like_status:2)
  {
    like_status
  } 
  }
`;

export const SchemeVideoStatus = gql`

query checkVideoStatus($video_id: Int!){
  checkVideoStatus(video_id:$video_id){
    bookmark_status
    like_status
    favorite_status
  }
}

`;

export const SchemeRemoveWatchLater = gql`
mutation removeVideoBookmark($video_id: Int!){
  removeVideoBookmark(video_id:$video_id,bookmark_type:"WATCH_LATER")
  {
      bookmark_status
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
mutation editProfile($profile_image:String,$country_abbr:String!, $email:String!$country_code:String!,$mobile_number:String!, $name:String!, $child_name:String!, $gender:String!, $grade:String!, $stream:String, $school_name:String!, $stream_id:Int){
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
query videos($order:String, $search_keyword:String){
  videos(lang_id:1,filter:{search_keyword:$search_keyword,order:$order}){
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

export const SchemeGetViewAllVideos = gql`
query webVideosViewAll($category_id:Int!, $page:Int!,$limit:Int!){
  webVideosViewAll(lang_id:1,category_id:$category_id,filter:{page:$page,limit:$limit,search_keyword:"",count:true}){
      count
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

export const SchemeGetCountryState = gql`
query universityState($country:String!){
  universityState(country:$country){
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
query universityDetails($id: Int!, $pool_id:Int, $field_id:Int){
  universityDetails(id:$id,lang_id:1, pool_id:$pool_id,field_id:$field_id){
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

export const SchemeGetUniversityPerPage = gql`
query allUniversity($limit:Int!, $page:Int!, $country:String, $state:String, $pool_id:Int, $field_id:Int, $ranking:String, $search_keyword:String){
  allUniversity(lang_id:1,filter:{count:true,limit:$limit,page:$page, country:$country, state:$state, pool_id:$pool_id, field_id:$field_id, ranking:$ranking, search_keyword:$search_keyword}){
    count
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

export const SchemeAllCareerPools = gql`
query{
  careerPools(lang_id:1){
    id
    name
  }
}
`;

export const SchemeAllUniversityCareerPools = gql`
query universityPool($college_id:Int!){
  universityPool(college_id:$college_id,lang_id:1){
    id
    name
    image
    thumbnail
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

export const SchemeUniversityCareerFields = gql`
query universityFields($college_id:Int!, $pool_id:Int!){
  universityFields(college_id:$college_id,lang_id:1,pool_id:$pool_id){
    id
    pool_id
    name
    image
    thumbnail
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

export const SchemeGetTopUniversities = gql`
query{
  topUniversity(lang_id:1){
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

export const SchemeGetArticleData = gql`
query{
  article_video(filter:{pool_id:1}){
    magazines{
      id
      title
      description
      tags
      video
      thumbnail
    }
    videos{
      id
      title
      description
      tags
      video
      thumbnail
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

export const SchemeGetMIOReport = gql`
query{
  intelligenceOrientation(lang_id:1)
  {
    spread_characteristics{
      expert{
        key
        info
      }
      advanced
      {
        key
        info
      }
       learner{
        key
        info
      }
      novice
      {
        key
        info
      }
    }
    orientation_details{
      title
      percentage
      content
    }
  }
}
`;

export const SchemeGetVAKReport = gql`
query{
  learningStyles(lang_id:1){
   title
   content
   percentage{
    seeing
    hearing
    doing
   }
}
  }
`;

export const SchemeGetMTIReport = gql`
query{
  environmentalInteractions(lang_id:1){
    world_dealing
    {
        text
        image
    }
    your_motivation
    {
        text
        image
    }
    leadership_strength
    {
        text
        image
    }
  }
}
`;

export const SchemeGetFACEReport = gql`
query{
  coreBehaviour1(lang_id:1){
    understanding_yourself
    {
        text
        image
    }
    interpersonal_relation
    {
        text
        image
    }
    others_view
    {
        text
        image
    }
    decision_taking
    {
        text
        image
    }
    associated_weakness
    {
        text
        image
    }
    recommendation
    {
        text
        image
    }
  }
}
`;

export const SchemeGetFACEReport2 = gql`
query{
  coreBehaviour2(lang_id:1){
    career_strength
    {
        label
        image
        score
        text
    }
    communication_pattern
    {
        label
        image
        score
        text
    }
  }
}
`;

export const SchemeGetGRITReport = gql`
query{
  passionPerseverance(lang_id:1){
   score
    circle_text
    quote_text
    step_text
  }
}
`;

export const SchemeGetLSReport = gql`
query{
  learningSuggestions(lang_id:1){
    content{
      image
      text
    }
  }
}
`;

export const SchemeGetCompetencyReport = gql`
query{
  competencies(lang_id:1){
    image,
    label,
    text,
    info,
    score
  }
}
`;

export const SchemeGetFigmentReport = gql`
query{
  careerFitment(lang_id:1){
    green_zone {
      career
      one_liner
      pool_id
      percentage
      personality_match
      orientation_match
      career_fields{
          id
          pool_id
          name
          image
          video
          description
      }
    }
    blue_zone
    {
     career
      one_liner
      pool_id
      percentage
       personality_match
      orientation_match
      career_fields{
          id
          pool_id
          name
          image
          video
          description
      }
    }
    orange_zone{
        career
      one_liner
      pool_id
      percentage
      personality_match
      orientation_match
      career_fields{
          id
          pool_id
          name
          image
          video
          description
      }
    }
    purple_zone{
        career
      one_liner
      pool_id
      percentage
      personality_match
      orientation_match
      career_fields{
          id
          pool_id
          name
          image
          video
          description
      }
    }
  }
}
`;

export const SchemeUpdateUniversityBookmark = gql`
mutation universityBookmark($college_id:Int!){
  universityBookmark(college_id:$college_id)
    {
      bookmark_status
    }
  }
`;
export const SchemeGetUniversityBookmarkList = gql`
query{
  universities{
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
`;

export const SchemeGetCoachesList = gql`
query{
  coaches(filter:{search_keyword:"",gender:""}){
    id
    name
    rating
    profile_image
    country_code
    mobile_number
    bio
    coaching_category,
    location,
    language,
  }
}
`;

export const SchemeGetCoacheDetails = gql`
query CoachDetails($id:Int!){
  CoachDetails(id:$id){
    id
    name
    rating
    profile_image
    country_code
    mobile_number
    bio
    coaching_category,
    location,
    language,
    slots{
      date
      times
      {
        start_time
        end_time
      }
    }
    purpose
  }
}
`;

export const SchemeGetPackagesList = gql`
query{
  coachingPackages{
    id
    title
    description
    thumbnail
    video
	  no_sessions
    purchase_status
    coaching_packages_prices{
      label
      price
      currency_code
    }
  }
}
`;
export const SchemeGetPackageDetails = gql`
query coachingPackageDetails($id:Int!){
  coachingPackageDetails(id:$id){
    id
    title
    description
    thumbnail
    video
		no_sessions
    coaching_packages_prices{
      price
    }
    coaching_package_session_titles{
      title
      coaching_package_sessions{
        id
        title
        description
        purpose
        session_time
      }
    }
  }
}
`;
export const SchemeViewAllMagazines = gql`
  query magazinesViewAll($category_id: Int, $search_keyword: String){
    magazinesViewAll(lang_id:1,category_id:$category_id,filter:{ search_keyword: $search_keyword }){
      id
      created_at
      lang_id
      title
      description
      category_id
      tags
      video
      thumbnail
    }
  }
`;

export const SchemeGetMagazinesCategories = gql`
  query{
    magazineCategory{
      id 
      name
    }
  }
`;

export const SchemeBookmarkMagazine = gql`
  mutation magazineBookmark($magazine_id: Int!) {
    magazineBookmark(magazine_id: $magazine_id)
    {
      bookmark_status
    }
  }
`;

export const SchemeCheckMagazineStatus = gql`
  query checkMagazineStatus($magazine_id:Int!){
    checkMagazineStatus(magazine_id: $magazine_id){
      bookmark_status
      like_status
    }
  }
`;

export const SchemeGetMagazineDetails = gql`
  query magazineDetails($id: Int!){
    magazineDetails(id: $id){
      details{
        id
        created_at
        lang_id
        title
        description
        category_id
        tags
        video
        thumbnail
        like_status
        bookmark_status
      }
      relatedVideos{
        id
        lang_id
        title
        description
        category_id
        tags
        video
        thumbnail
      }
    }
  }
`;

export const SchemeMyLifologyMagazines = gql`
  query magazines{
    magazines{
      id
      lang_id
      title
      description
      category_id
      tags
      video
      thumbnail
    }
  }
`;


export const SchemeGetTrendingMagazines = gql`
  query{
    trendingMagazines(lang_id:1){
      id
      created_at
      lang_id
      title
      description
      category_id
      tags
      video
      thumbnail
    }
  }
`;


export const SchemeGetMagazineBanner = gql`
  query{
    magazineBanners{
        id
        created_at
        title
        description
        image
        magazine_id
    }
  }
`;

export const SchemeAddMagazineComment = gql`
  mutation magazineComment($magazine_id: Int!, $comment: String!) {
    magazineComment(magazine_id: $magazine_id, comment: $comment)
    {
      id
      magazine_id
      user_id
      comment
    }
  }
`;

export const SchemeMagazineLikeDislike = gql`
  mutation magazineLikeStatus($magazine_id: Int!, $like_status: Int!) {
    magazineLikeStatus(magazine_id: $magazine_id, like_status: $like_status)
    {
      like_status
    }
  }
`;

export const SchemeGetScholarships = gql`
  query scholarshipsWeb($lang: Int!, $filter: Scholarship_Filter){
    scholarshipsWeb(lang: $lang, filter: $filter) {
      count
      scholarships {
        id
        name
        image
        description
        other_criteria
        amount
        studying_in
        deadline
        from_countries
        no_awards
        studying_subjects
        includes
      }
    }
  }
`;

export const SchemeGetScholarshipDetails = gql`
  query scholarshipDetails($scholarship_id: Int!){  
    scholarshipDetails(scholarship_id: $scholarship_id){
      id
      name
      image
      description
      other_criteria
      amount
      studying_in
      deadline
      from_countries
      no_awards
      studying_subjects
      includes
    }
  }
`;

export const SchemeGetScholarshipsCountries = gql`
  query{
    scholarshipCountry{
      from_countries{
          country
      }
      in_countries{
          country
      }
    }
  }
`;

export const SchemeCreateOrder = gql`
  mutation createOrder($coupon_code: String,$item_id: Int!, $currency: String!, $order_type: String!) {
    createOrder(coupon_code: $coupon_code,item_id: $item_id, currency: $currency,order_type:$order_type ) {
      id
      currency
      amount
      discount
    }
  }
`;

export const SchemeMyLifologyVideos = gql`
  query{
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
      
    }
  }
`;

export const SchemeMyLifologyCareerPools = gql`
  query{
    careerPools{
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

export const SchemeMyLifologyUniversities = gql`
  query{
    universities{
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
`;

export const SchemeGetPurchasedPakage = gql`
query{
  purchasedPackages{
    coaching_packages{
      id
      title
      description
      thumbnail
      video
      no_sessions
      coach_details{
        id
        name
        rating
        profile_image
        country_code
        mobile_number
        bio
        coaching_category,
        location,
        language,
      }
      coaching_packages_prices{
        price
      }
      coaching_package_session_titles{
        title
        coaching_package_sessions{
          id
          title
          description
          purpose
          session_time
          coach_id
          appointment_id
          session_status
          rating
        }
      }
    }
  }
}
`;

export const SchemeGetAvailablePackage = gql`
query{
  isAvailablePackages
}
`;

export const SchemeBookAppointment = gql`
mutation bookAppointment($coach_id:Int!, $session_id:Int!, $appointment_date: Date!, $start_time:String!, $end_time:String!, $duration:Int!){
  bookAppointment(coach_id: $coach_id,session_id: $session_id,appointment_date:$appointment_date,start_time:$start_time,end_time:$end_time,duration:$duration){
    id
    coach_id
    session_id
    appointment_date
    start_time
    end_time
    duration
    session_status 
  }
}
`;

export const SchemeUpdateAppointment = gql`
mutation bookAppointment($id:Int!, $appointment_date: Date!, $start_time:String!, $end_time:String!){
  updateAppointment(id:$id,appointment_date:$appointment_date,start_time:$start_time,end_time:$end_time){
    id
    appointment_date
    start_time
    end_time
  }
}
`;


export const SchemeAppointmentDetails = gql`
query appointmentDetails($id:Int!){
  appointmentDetails(id:$id)
  {
    id
    coach_id
    session_id
    appointment_date
    start_time
    end_time
    duration
    session_status
    reschedule_by
    meeting_link
    tasks{
      name
      status
    }
    coach_rating
    user_rating
    coach_feedback
    user_feedback
    is_concern
    meeting_info
    coach_details{
      id
      name
      rating
      profile_image
      country_code
      country_abbr
      mobile_number
      bio
      coaching_category
      location
      language
      slots{
        date
        times{
          start_time
          end_time
        }
      }
      purpose
    }
  }
}
`;

export const SchemeCancelAppointment = gql`
mutation cancelAppointment($id:Int!){
  cancelAppointment(appointment_id:$id)
}
`;

export const SchemeGetSummaryDetails = gql`
query assessmentDetails($id:Int!){
  assessmentDetails(id:$id){
    summary_report
  }
}
`;

export const SchemeGetHomeData = gql`
  query{
    home{
      start_video{
        id
        title
        video
        thumbnail
        description
      }
      master_class_videos{
        id
        title
        video
        thumbnail
        description
        alt_thumbnail
      }
      assessment{
        id
        title
        subtitle
        dash_cards_image
        instruction
        icon
        lang_id
        assessment_type
        description
        assessment_status
        total_questions
        attempted_questions
      }
      completed_assessment
      watch_videos{
        id
        title
        video
        thumbnail
        description
      }
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
      articles{
        id
        lang_id
        title
        description
        description
        category_id
        tags
        video
        thumbnail
      }
      coach
      {
        id
        name
        profile_image
      }
      total_coach
      user_details{
        time_spent
        better_than
        percentage_dif
        time_description
        badge_url
        badge_description
      }
    }
  }
`;