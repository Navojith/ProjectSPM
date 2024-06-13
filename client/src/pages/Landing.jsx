import { Link } from 'react-router-dom';
import Member from '../components/Members';
import Pawara from '/assets/images/pawara.jpg';
import Chamithu from '/assets/images/chamithu.jpeg';
import Shenan from '/assets/images/shenan.jpg';
import Dinal from '/assets/images/Dinal.jpg';

const Landing = () => {
  return (
    <div className="bg-white">
      {console.log(Pawara)}
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ffa726] to-[#d32f2f] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
        <div className="mx-auto max-w-2xl ">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Retina
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Ocular disease recognition leveraging cnn Anim aute id magna
              aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat
              commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to="/getstarted"
                className="rounded-full bg-orange-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
              >
                Get started
              </Link>
            </div>
          </div>
        </div>
        <div className="my-16">
          <center>
            <h1 className=" text-xl font-bold tracking-tight text-gray-900 ">
              Team Members
            </h1>
            <div className="ml-[-1rem] flex flex-row flex-wrap place-content-evenly space-evenly w-4/5">
              <Member
                github=""
                img={Dinal}
                linkedIn=""
                name={'Dinal Senadheera'}
              />
              <Member
                github="https://github.com/Navojith"
                img={Pawara}
                linkedIn="https://www.linkedin.com/in/pawara-navojith-aa607a208/"
                name={'Pawara Navojith'}
              />
              <Member
                github="https://github.com/ch4mi2"
                img={Chamithu}
                linkedIn="https://www.linkedin.com/in/chamithu-gunawardana-009909215/"
                name={'Chamithu Gunawardana'}
              />
              <Member github="https://github.com/ShenanPerera" 
              img={Shenan} 
              linkedIn="https://www.linkedin.com/in/shenan-perera/" 
              name={'Shenan Perera'} />
            </div>
          </center>
        </div>
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Landing;
