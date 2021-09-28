const SocialCard = ({ icon, link, title, color }) => {
  return (
    <div className={`${color} rounded-lg hover:bg-opacity-70`}>
      <a href={link} target='_blank' rel='noopener noreferrer'>
        <div className='flex rounded-md py-5 my-auto'>
          <div className='my-auto ml-5 mr-3'>{icon}</div>
          <div>
            <p className='text-lg text-white'>{title}</p>
          </div>
        </div>
      </a>
    </div>
  );
};

export default SocialCard;
