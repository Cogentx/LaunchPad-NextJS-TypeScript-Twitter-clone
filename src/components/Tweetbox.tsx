import {
  CalendarIcon,
  EmojiHappyIcon,
  LocationMarkerIcon,
  PhotographIcon,
  SearchIcon,
} from '@heroicons/react/outline';

export default function Tweetbox() {
  return (
    <div>
      <img src="/avatar-profile-placeholder.jpeg" alt="placeholder profile avatar"
      className="rounded-full object-cover h-14 w-14 mt-4" />

      <div>
        <form>
          <input type="text" placeholder="What's happening?" />
          <div>
            <div>
              {/* Icons */}
            </div>
            <button>Tweet</button>
          </div>
        </form>
      </div>
    </div>
  );
}
