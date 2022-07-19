import styled from "styled-components";
import PropTypes from "prop-types";
import { FaBookmark, FaRegBookmark, FaShareAlt } from "react-icons/fa";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import { IoIosArrowRoundDown } from "react-icons/io";
import useSound from "use-sound";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

import mutedState from "../../recoil/muted";
import useModal from "../../hooks/useModal";

function BottomButtons({
  onNewButtonClick,
  onBookmarkButtonClick,
  photoId,
  soundUrl,
  isBookmark,
}) {
  const [muted, setMuted] = useRecoilState(mutedState);
  const [play, { stop, sound }] = useSound(soundUrl, {
    interrupt: true,
    onend: () => {
      onNewButtonClick();
    },
  });
  const { showModal } = useModal();
  const handleShareButtonClick = async () => {
    await navigator.clipboard.writeText(`${window.location.origin}/${photoId}`);

    showModal({
      modalType: "ConfirmModal",
      modalProps: {
        message: "The URL of the landscape with the sound has been copied",
      },
    });
  };

  useEffect(() => {
    if (sound && !muted) {
      sound._loop = true;
      play();
    }

    return () => stop();
  }, [sound, muted, play, stop]);

  return (
    <Wrapper>
      <LeftButtonGroup>
        {isBookmark ? (
          <BookmarkButton />
        ) : (
          <BookmarkRegButton onClick={onBookmarkButtonClick} />
        )}
        <ShareButton onClick={handleShareButtonClick} />
      </LeftButtonGroup>

      <CenterGroup>
        <NewLandscapeButton
          onClick={() => {
            stop();
            onNewButtonClick();
          }}
        >
          new landscape
        </NewLandscapeButton>
        <ScrollArrowWrapper>
          <span>Scroll</span>
          <ScrollArrow />
        </ScrollArrowWrapper>
      </CenterGroup>

      {muted ? (
        <VolumeOffButton
          onClick={() => {
            setMuted(!muted);
          }}
        />
      ) : (
        <VolumeButton
          onClick={() => {
            setMuted(!muted);
          }}
        />
      )}
    </Wrapper>
  );
}

BottomButtons.propTypes = {
  onNewButtonClick: PropTypes.func.isRequired,
  onBookmarkButtonClick: PropTypes.func.isRequired,
  photoId: PropTypes.string.isRequired,
  soundUrl: PropTypes.string.isRequired,
  isBookmark: PropTypes.bool.isRequired,
};

const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  bottom: 0.1rem;
  padding: 1rem 0.5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const LeftButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 8.5rem;
  padding: 0 0.5rem;
`;

const Icon = styled.div`
  width: 3.2rem;
  height: 3rem;
  padding: 0.5rem 0.01rem;
  border-radius: 50%;
  font-size: 1rem;
  color: #265d6e;
  background-color: white;
`;

const BookmarkButton = styled(Icon.withComponent(FaBookmark))``;
const BookmarkRegButton = styled(Icon.withComponent(FaRegBookmark))``;
const ShareButton = styled(Icon.withComponent(FaShareAlt))``;

const CenterGroup = styled.div`
  position: absolute;
  left: 50%;
  transform: translate(-40%, 0%);
  display: flex;
  flex-direction: row;
  align-items: center;

  @media only screen and (min-width: 768px) {
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0%);
  }
`;

const NewLandscapeButton = styled.button`
  width: 13rem;
  height: 3rem;
  margin-right: 0.5rem;
  color: white;
  background-color: rgba(255, 255, 255, 0);
  border: 0.3rem solid white;
  border-radius: 20rem;
  font-size: 1.3rem;
  font-family: "Playfair Display", serif;
  font-weight: 600;
  cursor: pointer;

  @media only screen and (min-width: 768px) {
    width: 25rem;
  }
`;

const VolumeButton = styled(HiVolumeUp)`
  width: 3.5rem;
  height: 2.5rem;
  font-size: 1rem;
  color: white;
`;

const ScrollArrowWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
`;

const ScrollArrow = styled(IoIosArrowRoundDown)`
  font-size: 2rem;
  color: white;
`;

const VolumeOffButton = styled(HiVolumeOff)`
  width: 3.5rem;
  height: 2.5rem;
  font-size: 1rem;
  color: white;
`;

export default BottomButtons;
