import { Link } from 'react-router-dom';
import { BsGithub } from 'react-icons/bs';
import { BsLinkedin } from 'react-icons/bs';

const Member = ({ img, github, linkedIn, name }) => {
  return (
    <div className="text-white border rounded-[10%] bg-gray-800 px-8 py-4  mt-8 w-[300px]">
      <p className="text-center font-bold mb-4">{name}</p>
      <img
        className="rounded-full border-2 border-white mb-6"
        src={img}
        alt="member pic"
        width={100}
        height={100}
      />
      <div className="flex justify-center">
        <Link to={github} target="_blank" rel="noopener noreferrer">
          <BsGithub className="text-2xl mx-1" />
        </Link>
        <Link to={linkedIn} target="_blank" rel="noopener noreferrer">
          <BsLinkedin className="text-2xl mx-1 rounded-full" />
        </Link>
      </div>
    </div>
  );
};

export default Member;
