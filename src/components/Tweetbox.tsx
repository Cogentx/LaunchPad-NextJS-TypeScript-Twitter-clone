import {
  CalendarIcon,
  EmojiHappyIcon,
  LocationMarkerIcon,
  PhotographIcon,
  SearchIcon,
} from '@heroicons/react/outline';
import { useSession } from 'next-auth/react';
import { useRef, useState } from 'react';

export default function Tweetbox() {
  const [input, setInput] = useState<string>('');
  const [imageUrlBoxIsOpen, setImageUrlBoxIsOpen] = useState<boolean>(false);
  const [image, setImage] = useState<string>('');
  const imageInputRef = useRef<HTMLInputElement>(null);
  const { data: session } = useSession();

  const addImageToTweet = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    // if no image URL is provided; exit function
    if (!imageInputRef?.current?.value) return;

    // if image URL is provided; store in state
    setImage(imageInputRef.current.value);

    // clear image URL from input field
    imageInputRef.current.value = '';

    // close image URL input box
    setImageUrlBoxIsOpen(false);
  };

  return (
    <div className="flex space-x-2 p-5">
      <img
        src={session?.user?.image || '/avatar-profile-placeholder.jpeg'}
        alt="placeholder profile avatar"
        className="h-14 w-14 rounded-full object-cover"
      />

      <div className="flex flex-1 items-center pl-2">
        <form className="flex flex-1 flex-col">
          <input
            className="h-24 w-full text-xl outline-none placeholder:text-xl"
            type="text"
            placeholder="What's happening?"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <div className="flex items-center">
            <div className="flex flex-1 space-x-2 text-twitter">
              <PhotographIcon
                onClick={() => setImageUrlBoxIsOpen(!imageUrlBoxIsOpen)}
                className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150"
              />
              <SearchIcon className="h-5 w-5" />
              <EmojiHappyIcon className="h-5 w-5" />
              <CalendarIcon className="h-5 w-5" />
              <LocationMarkerIcon className="h-5 w-5" />
            </div>
            <button
              disabled={!input || !session}
              className="rounded-full bg-twitter px-5 py-2 font-bold text-white disabled:opacity-40"
            >
              Tweet
            </button>
          </div>

          {/* Image Box | if open */}
          {imageUrlBoxIsOpen && (
            <form className="mt-5 flex rounded-lg bg-twitter/80 py-2 px-4">
              <input
                ref={imageInputRef}
                className="flex-1 bg-transparent p-2 text-white outline-none placeholder:text-white"
                type="text"
                placeholder="Enter image URL..."
              />
              <button
                type="submit"
                onClick={addImageToTweet}
                className="font-bold text-white"
              >
                Add Image
              </button>
            </form>
          )}

          {/* Tweet Image | if available */}
          {image && <img className="mt-4 pb-2 h-40 w-full object-contain rounded-xl shadow-lg" src={image} />}
        </form>
      </div>
    </div>
  );
}
