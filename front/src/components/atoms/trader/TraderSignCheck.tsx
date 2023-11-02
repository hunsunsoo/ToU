import React, { useState } from 'react';

const TraderSignCheck: React.FC = () => {
    const [isChecked, setIsChecked] = useState(false);

    return (
        <div>
            <label>
                <input 
                    type="checkbox" 
                    checked={isChecked} 
                    onChange={() => setIsChecked(!isChecked)}
                />
                서명 필요만 보기
            </label>
        </div>
    );
};

export default TraderSignCheck;
