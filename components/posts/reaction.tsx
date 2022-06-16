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
    <div className='grid grid-cols-4 items-center justify-between gap-2 md:grid-cols-2 md:gap-4'>
      <ReactionCard
        isActive={liked}
        incrementCB={handleIncrementLike}
        decrementCB={handleDecrementLike}
      >
        <svg
          className='h-10 w-10'
          id='Layer_1'
          viewBox='0 0 64 64'
          xmlSpace='preserve'
          xmlns='http://www.w3.org/2000/svg'
        >
          <style>{'.st16{fill:#fff}'}</style>
          <linearGradient
            gradientUnits='userSpaceOnUse'
            id='SVGID_1_'
            x1={32}
            x2={32}
            y1={7}
            y2={71.582}
          >
            <stop
              offset={0}
              style={{
                stopColor: '#0AC5B3',
              }}
            />
            <stop
              offset={1}
              style={{
                stopColor: '#0AC5B3',
              }}
            />
          </linearGradient>
          <path
            d='M42.7 2.9H21.3c-3.8 0-7.3 2-9.2 5.3L1.4 26.7C-.5 30-.5 34 1.4 37.3l10.7 18.5c1.9 3.3 5.4 5.3 9.2 5.3h21.4c3.8 0 7.3-2 9.2-5.3l10.7-18.5c1.9-3.3 1.9-7.3 0-10.6L51.9 8.2c-1.9-3.3-5.4-5.3-9.2-5.3z'
            style={{
              fill: 'url(#SVGID_1_)',
            }}
          />
          <path
            d='m62.6 26.7-4.6-8C56.6 38.4 40.1 54 20 54c-3.3 0-6.5-.4-9.6-1.2l1.8 3c1.9 3.3 5.4 5.3 9.2 5.3h21.4c3.8 0 7.3-2 9.2-5.3l10.7-18.5c1.8-3.3 1.8-7.3-.1-10.6z'
            style={{
              opacity: 0.1,
              fill: '#333',
            }}
          />
          <ellipse
            cx={24.5}
            cy={8.3}
            rx={7.5}
            ry={3.3}
            style={{
              opacity: 0.15,
              fill: '#fff',
            }}
          />
          <path
            className='st16'
            d='M19.3 48.9H17c-2.2 0-4-1.8-4-4V34.5c0-2.2 1.8-4 4-4h2.3c2.2 0 4 1.8 4 4V45c0 2.1-1.8 3.9-4 3.9zM51 35.8c0-.8-.3-1.4-.8-1.9-.6-.6-.7-1.4-.2-2.1.3-.4.4-.9.4-1.5 0-1.5-1.3-2.8-2.8-2.8h-7.9c-1 0-1.8-.9-1.7-1.9.2-1.3.3-3.2.1-5.1-.4-3.5-2.8-5.1-4.1-5.4-.6-.2-1.1.1-1.4.4-.3.3-.5.7-.5 1.1v4.8c0 .3-.1.5-.2.7-.8 1.6-4.1 7.9-4.7 8.8-.1.2-.3.4-.5.6-.9.9-1.4 2.2-1.4 3.4V45c0 .5.2.9.5 1.2 1.7 1.6 3.5 1.5 3.5 1.5h14.9c1.5-.1 2.7-1.3 2.7-2.7v-.1c0-.7.4-1.2 1-1.5.9-.5 1.5-1.4 1.5-2.5 0-.4-.1-.7-.2-1.1-.3-.7-.1-1.4.5-1.8.8-.4 1.3-1.2 1.3-2.2z'
          />
        </svg>
        <span className='mt-2 text-xl font-semibold'>
          {reactions?.like_count}
        </span>
        <span className='text-sm'>LIKE</span>
      </ReactionCard>

      <ReactionCard
        isActive={loved}
        incrementCB={handleIncrementLove}
        decrementCB={handleDecrementLove}
      >
        <svg
          className='h-10 w-10'
          id='Layer_1'
          viewBox='0 0 64 64'
          xmlSpace='preserve'
          xmlns='http://www.w3.org/2000/svg'
        >
          <style>
            {
              '.st1{fill:#8fe8f7}.st5{fill:url(#SVGID_4_)}.st6{fill:url(#SVGID_5_)}.st7{fill:url(#SVGID_6_)}.st8{fill:url(#SVGID_7_)}.st9{fill:url(#SVGID_8_)}.st10{fill:url(#SVGID_9_)}.st11{fill:url(#SVGID_10_)}.st12{fill:url(#SVGID_11_)}.st14{fill:url(#SVGID_12_)}.st15{fill:url(#SVGID_13_)}.st16{fill:#fff}.st17{fill:url(#SVGID_14_)}.st18{opacity:.15;fill:#fff}'
            }
          </style>
          <linearGradient
            gradientUnits='userSpaceOnUse'
            id='SVGID_1_'
            x1={32}
            x2={32}
            y1={67.75}
            y2={-2.33}
          >
            <stop
              offset={0}
              style={{
                stopColor: '#02cf98',
              }}
            />
            <stop
              offset={1}
              style={{
                stopColor: '#02a3a9',
              }}
            />
          </linearGradient>
          <path
            d='M42.7 2.9H21.3c-3.8 0-7.3 2-9.2 5.3L1.4 26.7C-.5 30-.5 34 1.4 37.3l10.7 18.5c1.9 3.3 5.4 5.3 9.2 5.3h21.4c3.8 0 7.3-2 9.2-5.3l10.7-18.5c1.9-3.3 1.9-7.3 0-10.6L51.9 8.2c-1.9-3.3-5.4-5.3-9.2-5.3z'
            style={{
              fill: 'url(#SVGID_1_)',
            }}
          />
          <path
            d='m62.6 26.7-4.6-8C56.6 38.4 40.1 54 20 54c-3.3 0-6.5-.4-9.6-1.2l1.8 3c1.9 3.3 5.4 5.3 9.2 5.3h21.4c3.8 0 7.3-2 9.2-5.3l10.7-18.5c1.8-3.3 1.8-7.3-.1-10.6z'
            style={{
              opacity: 0.1,
              fill: '#333',
            }}
          />
          <ellipse
            cx={24.5}
            cy={8.3}
            rx={7.5}
            ry={3.3}
            style={{
              opacity: 0.3,
              fill: '#fff',
            }}
          />
          <linearGradient
            gradientUnits='userSpaceOnUse'
            id='SVGID_2_'
            x1={50.361}
            x2={42.861}
            y1={7.491}
            y2={38.991}
          >
            <stop
              offset={0}
              style={{
                stopColor: '#ed2e3b',
              }}
            />
            <stop
              offset={1}
              style={{
                stopColor: '#ff600b',
              }}
            />
          </linearGradient>
          <path
            d='M58.4 20.9v-.2c.2-3.4-2.1-6.4-5.4-6.9-1.8-.3-3.6.3-4.9 1.4-1-1.4-2.5-2.5-4.3-2.7-3.3-.5-6.4 1.8-7.1 5.2v.4c-.1 1 0 1.9.2 2.8 1.4 6.5 8.8 12 8.8 12s8.7-3.4 11.8-9.2c.5-.8.8-1.7 1-2.6-.1 0-.1-.1-.1-.2z'
            style={{
              fill: 'url(#SVGID_2_)',
            }}
          />
          <linearGradient
            gradientUnits='userSpaceOnUse'
            id='SVGID_3_'
            x1={14.042}
            x2={20.042}
            y1={4.092}
            y2={42.425}
          >
            <stop
              offset={0}
              style={{
                stopColor: '#ed2e3b',
              }}
            />
            <stop
              offset={1}
              style={{
                stopColor: '#ff600b',
              }}
            />
          </linearGradient>
          <path
            d='M29.1 16.8v-.3c-.9-4-4.6-6.7-8.5-6.1-2.1.3-3.9 1.6-5 3.3-1.6-1.3-3.7-2-5.8-1.7-3.9.6-6.6 4.3-6.3 8.4 0 .1 0 .2.1.3v.2c.2 1.2.6 2.2 1.2 3.2 3.7 7 14 10.9 14 10.9s8.6-6.8 10.2-14.6c.3-1.1.4-2.2.2-3.4 0-.1-.1-.2-.1-.2z'
            style={{
              fill: 'url(#SVGID_3_)',
            }}
          />
          <path d='M32 53c6.1 0 11.2-4.2 12.9-10 .6-2-.9-4-2.9-4H22c-2 0-3.5 2-2.9 4 1.7 5.8 6.8 10 12.9 10z' />
        </svg>
        <span className='mt-2 text-xl font-semibold'>
          {reactions?.love_count}
        </span>
        <span className='text-sm uppercase'>LOVE</span>
      </ReactionCard>

      <ReactionCard
        isActive={wow}
        incrementCB={handleIncrementWow}
        decrementCB={handleDecrementWow}
      >
        <svg
          className='h-10 w-10'
          id='Layer_1'
          viewBox='0 0 64 64'
          xmlSpace='preserve'
          xmlns='http://www.w3.org/2000/svg'
        >
          <style>
            {
              '.st1{fill:#8fe8f7}.st2{fill:url(#SVGID_2_)}.st4{fill:url(#SVGID_3_)}.st5{fill:url(#SVGID_4_)}.st6{fill:url(#SVGID_5_)}.st7{fill:url(#SVGID_6_)}.st8{fill:url(#SVGID_7_)}.st9{fill:url(#SVGID_8_)}.st10{fill:url(#SVGID_9_)}.st11{fill:url(#SVGID_10_)}.st12{fill:url(#SVGID_11_)}.st14{fill:url(#SVGID_12_)}.st15{fill:url(#SVGID_13_)}.st16{fill:#fff}.st17{fill:url(#SVGID_14_)}.st18{opacity:.15;fill:#fff}'
            }
          </style>
          <linearGradient
            gradientUnits='userSpaceOnUse'
            id='SVGID_1_'
            x1={32}
            x2={32}
            y1={67.75}
            y2={-2.33}
          >
            <stop
              offset={0}
              style={{
                stopColor: '#02cf98',
              }}
            />
            <stop
              offset={1}
              style={{
                stopColor: '#02a3a9',
              }}
            />
          </linearGradient>
          <path
            d='M42.7 2.9H21.3c-3.8 0-7.3 2-9.2 5.3L1.4 26.7C-.5 30-.5 34 1.4 37.3l10.7 18.5c1.9 3.3 5.4 5.3 9.2 5.3h21.4c3.8 0 7.3-2 9.2-5.3l10.7-18.5c1.9-3.3 1.9-7.3 0-10.6L51.9 8.2c-1.9-3.3-5.4-5.3-9.2-5.3z'
            style={{
              fill: 'url(#SVGID_1_)',
            }}
          />
          <path
            d='m62.6 26.7-4.6-8C56.6 38.4 40.1 54 20 54c-3.3 0-6.5-.4-9.6-1.2l1.8 3c1.9 3.3 5.4 5.3 9.2 5.3h21.4c3.8 0 7.3-2 9.2-5.3l10.7-18.5c1.8-3.3 1.8-7.3-.1-10.6z'
            style={{
              opacity: 0.1,
              fill: '#333',
            }}
          />
          <ellipse cx={32} cy={43.5} rx={9} ry={13.5} />
          <ellipse cx={19} cy={20.1} rx={5} ry={6.1} />
          <ellipse cx={45} cy={20.1} rx={5} ry={6.1} />
          <path d='M51 12c-.4 0-.8-.1-1.1-.3-4.8-3.2-9.7 0-9.8 0-.9.6-2.2.4-2.8-.6-.6-.9-.4-2.2.6-2.8.3-.2 7.2-4.7 14.2 0 .9.6 1.2 1.9.6 2.8-.4.6-1.1.9-1.7.9zM24 12c-.4 0-.8-.1-1.1-.3-.2-.1-5-3.2-9.8 0-.9.6-2.2.4-2.8-.6-.6-.9-.4-2.2.6-2.8 7-4.7 13.9-.2 14.2 0 .9.6 1.2 1.9.6 2.8-.4.6-1.1.9-1.7.9z' />
          <ellipse
            cx={24.5}
            cy={8.3}
            rx={7.5}
            ry={3.3}
            style={{
              opacity: 0.3,
              fill: '#fff',
            }}
          />
        </svg>
        <span className='mt-2 text-xl font-semibold'>
          {reactions?.wow_count}
        </span>
        <span className='text-sm uppercase'>Wow</span>
      </ReactionCard>

      <ReactionCard
        isActive={yay}
        incrementCB={handleIncrementYay}
        decrementCB={handleDecrementYay}
      >
        <svg
          id='Layer_1'
          className='h-10 w-10'
          viewBox='0 0 64 64'
          xmlSpace='preserve'
          xmlns='http://www.w3.org/2000/svg'
        >
          <style>
            {
              '.st1{fill:#8fe8f7}.st2{fill:url(#SVGID_2_)}.st4{fill:url(#SVGID_3_)}.st5{fill:url(#SVGID_4_)}.st6{fill:url(#SVGID_5_)}.st7{fill:url(#SVGID_6_)}.st8{fill:url(#SVGID_7_)}.st9{fill:url(#SVGID_8_)}.st10{fill:url(#SVGID_9_)}.st11{fill:url(#SVGID_10_)}.st12{fill:url(#SVGID_11_)}.st13{opacity:.3;fill:#fff}.st14{fill:url(#SVGID_12_)}.st15{fill:url(#SVGID_13_)}.st16{fill:#fff}.st17{fill:url(#SVGID_14_)}.st18{opacity:.15;fill:#fff}'
            }
          </style>
          <linearGradient
            gradientUnits='userSpaceOnUse'
            id='SVGID_1_'
            x1={32}
            x2={32}
            y1={67.75}
            y2={-2.33}
          >
            <stop
              offset={0}
              style={{
                stopColor: '#02cf98',
              }}
            />
            <stop
              offset={1}
              style={{
                stopColor: '#02a3a9',
              }}
            />
          </linearGradient>
          <path
            d='M42.7 2.9H21.3c-3.8 0-7.3 2-9.2 5.3L1.4 26.7C-.5 30-.5 34 1.4 37.3l10.7 18.5c1.9 3.3 5.4 5.3 9.2 5.3h21.4c3.8 0 7.3-2 9.2-5.3l10.7-18.5c1.9-3.3 1.9-7.3 0-10.6L51.9 8.2c-1.9-3.3-5.4-5.3-9.2-5.3z'
            style={{
              fill: 'url(#SVGID_1_)',
            }}
          />
          <path
            d='m62.6 26.7-4.6-8C56.6 38.4 40.1 54 20 54c-3.3 0-6.5-.4-9.6-1.2l1.8 3c1.9 3.3 5.4 5.3 9.2 5.3h21.4c3.8 0 7.3-2 9.2-5.3l10.7-18.5c1.8-3.3 1.8-7.3-.1-10.6z'
            style={{
              opacity: 0.1,
              fill: '#333',
            }}
          />
          <path d='M54 23c-1.1 0-2-.9-2-2 0-2.8-2.2-5-5-5s-5 2.2-5 5c0 1.1-.9 2-2 2s-2-.9-2-2c0-5 4-9 9-9s9 4 9 9c0 1.1-.9 2-2 2zM24 23c-1.1 0-2-.9-2-2 0-2.8-2.2-5-5-5s-5 2.2-5 5c0 1.1-.9 2-2 2s-2-.9-2-2c0-5 4-9 9-9s9 4 9 9c0 1.1-.9 2-2 2zM32 38.5c-12.2 0-16-8.3-16.1-8.7-.4-1 0-2.2 1-2.6 1-.4 2.2 0 2.6 1 .1.2 3 6.3 12.5 6.3s12.3-6.1 12.5-6.3c.5-1 1.6-1.5 2.6-1 1 .4 1.5 1.6 1 2.6-.1.4-3.9 8.7-16.1 8.7z' />
        </svg>
        <span className='mt-2 text-xl font-semibold'>
          {reactions?.yay_count}
        </span>
        <span className='text-sm uppercase'>YAY</span>
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
        isActive ? 'bg-[#202022]' : 'bg-background_100'
      } general-ring-state flex flex-1 flex-col items-center rounded-lg py-4 transition-all duration-1000`}
    >
      {children}
    </div>
  );
}
