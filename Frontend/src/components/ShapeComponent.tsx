import type { operation } from '../types'

const ShapeComponent = ({ shape, setShape }: { shape: operation, setShape: (shape: operation) => void }) => {

    return (
        <div className='cursor-pointer absolute w-1/4 bg-white z-1 flex justify-around'>
            {(['click', 'square', 'circle'] as const).map(type => (
                <p
                    key={type}
                    className={`${shape === type ? 'border-2 border-blue-700' : ''}`}
                    onClick={() => setShape(type)}
                >
                    {type === 'click' ? 'Mouse' : type.charAt(0).toUpperCase() + type.slice(1)}
                </p>
            ))}
        </div>
    );
};

export default ShapeComponent