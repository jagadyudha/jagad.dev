import useReactions from '../../hooks/useReactions';

const Reactions = ({ slug }: any) => {
  const {
    liked,
    loved,
    wow,
    yay,
    reactions,
    handleIncrementLike,
    handleDecrementLike,
    handleIncrementLove,
    handleDecrementLove,
    handleIncrementWow,
    handleDecrementWow,
    handleIncrementYay,
    handleDecrementYay,
  } = useReactions(slug);

  return (
    <div className='grid grid-cols-4 items-center justify-between gap-6 md:grid-cols-2'>
      <ReactionCard
        isActive={liked}
        incrementCB={handleIncrementLike}
        decrementCB={handleDecrementLike}
      >
        <span className='text-4xl'>👍</span>
        <span className='text-xl font-semibold'>{reactions?.like_count}</span>
        <span className='text-sm'>LIKE</span>
      </ReactionCard>

      <ReactionCard
        isActive={loved}
        incrementCB={handleIncrementLove}
        decrementCB={handleDecrementLove}
      >
        <span className='text-4xl'>❤️</span>
        <span className='text-xl font-semibold'>{reactions?.love_count}</span>
        <span className='text-sm uppercase'>LOVE</span>
      </ReactionCard>

      <ReactionCard
        isActive={wow}
        incrementCB={handleIncrementWow}
        decrementCB={handleDecrementWow}
      >
        <span className='text-4xl'>👏</span>
        <span className='text-xl font-semibold'>{reactions?.wow_count}</span>
        <span className='text-sm uppercase'>Wow</span>
      </ReactionCard>

      <ReactionCard
        isActive={yay}
        incrementCB={handleIncrementYay}
        decrementCB={handleDecrementYay}
      >
        <span className='text-4xl'>🎉</span>
        <span className='text-xl font-semibold'>{reactions?.yay_count}</span>
        <span className='text-sm uppercase'>PARTY</span>
      </ReactionCard>
    </div>
  );
};

export default Reactions;

function ReactionCard({ isActive, incrementCB, decrementCB, children }: any) {
  return (
    <div
      role='button'
      onClick={isActive ? () => decrementCB() : () => incrementCB()}
      className={`${
        isActive ? 'bg-background_100' : 'bg-background'
      } general-ring-state flex flex-1 flex-col items-center rounded-lg border border-white border-opacity-10 py-4`}
    >
      {children}
    </div>
  );
}
