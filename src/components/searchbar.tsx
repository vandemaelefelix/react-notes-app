import { ChangeEventHandler, MouseEventHandler, useRef, useState, MouseEvent, ChangeEvent } from 'react';

function SearchBar() {
    const [searchValue, setSearchValue] = useState<string>('');
    const [isInputCrossVisible, setIsInputCrossVisible] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const updateSearchInput: ChangeEventHandler = (event: ChangeEvent<HTMLInputElement>): void => {
        const value: string = event.currentTarget.value;
        if (value !== '') {
            setIsInputCrossVisible(true);
        } else {
            setIsInputCrossVisible(false);
        }
        setSearchValue(value);
    };

    const handleClearClick: MouseEventHandler = (event: MouseEvent<HTMLElement>): void => {
        event.preventDefault();
        setSearchValue('');
        setIsInputCrossVisible(false);
    };

    return (
        <div className="searchContainer">
            <label className="searchBar">
                <input
                    className="searchInput"
                    type="search"
                    placeholder="Search"
                    onChange={updateSearchInput}
                    value={searchValue}
                    ref={inputRef}
                />
                <svg className="searchIcon" viewBox="0 0 50 50">
                    <path d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z"></path>
                </svg>

                <svg
                    className={`
                        searchCross 
                        ${isInputCrossVisible ? 'show' : ''}
                    `}
                    viewBox="0 0 43 43"
                    onClick={handleClearClick}
                    onMouseDown={(e): void => e.preventDefault()}
                >
                    <path d="M21.5,0A21.5,21.5,0,1,1,0,21.5,21.5,21.5,0,0,1,21.5,0Z" fill="#363a4d" id="circle" />
                    <path
                        d="M11,13.5a2.492,2.492,0,0,1-1.768-.732l-11-11a2.5,2.5,0,0,1,0-3.536,2.5,2.5,0,0,1,3.536,0l11,11A2.5,2.5,0,0,1,11,13.5Z"
                        transform="translate(16 16)"
                        fill="#fff"
                        id="line1"
                    />
                    <path
                        d="M0,13.5a2.492,2.492,0,0,1-1.768-.732,2.5,2.5,0,0,1,0-3.536l11-11a2.5,2.5,0,0,1,3.536,0,2.5,2.5,0,0,1,0,3.536l-11,11A2.492,2.492,0,0,1,0,13.5Z"
                        transform="translate(16 16)"
                        fill="#fff"
                        id="line2"
                    />
                </svg>
            </label>
        </div>
    );
}

export default SearchBar;
