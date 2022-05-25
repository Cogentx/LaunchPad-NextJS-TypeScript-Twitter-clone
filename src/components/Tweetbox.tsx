import {
  CalendarIcon,
  EmojiHappyIcon,
  LocationMarkerIcon,
  PhotographIcon,
  SearchIcon,
} from '@heroicons/react/outline';

export default function Tweetbox() {
  return (
    <div className="flex space-x-2 p-5">
      <img src="/avatar-profile-placeholder.jpeg" alt="placeholder profile avatar"
      className="rounded-full object-cover h-14 w-14" />

      <div className="flex flex-1 items-center pl-2">
        <form className="flex flex-1 flex-col">
          <input className="h-24 w-full text-xl outline-none placeholder:text-xl" type="text" placeholder="What's happening?" />
          <div className="flex items-center">
            <div className="flex flex-1 space-x-2 text-twitter">
              <PhotographIcon className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150"/>
              <SearchIcon className="h-5 w-5"/>
              <EmojiHappyIcon className="h-5 w-5"/>
              <CalendarIcon className="h-5 w-5"/>
              <LocationMarkerIcon className="h-5 w-5"/>
            </div>
            <button className="bg-twitter px-5 py-2 text-white font-bold rounded-full">Tweet</button>
          </div>
        </form>
      </div>
    </div>
  );
}
