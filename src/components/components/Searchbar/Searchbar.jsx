import { HiSearch } from 'react-icons/hi';
import { Notify } from 'notiflix';
import css from './Searchbar.module.css';
import { useState } from "react";

export function Searchbar({onSubmit}) {
    const [query, setQuery] = useState('');

    const onChange = event => {
        const { value } = event.currentTarget;
        setQuery(value);
    }
    
    const handleSubmit = event => {
        event.preventDefault();

        if (query.trim() === '') {
            Notify.failure('Enter your search request, please!');
            return;
        }
        onSubmit(query);
        setQuery('');
    }

        return (
        <header className={css.searchbar}>
            <form className={css.form} onSubmit={handleSubmit}>
                <input
                    className={css.input}
                    name="query"
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    onChange={onChange}
                    value={query}
                    />
                    
                <button type="submit" className={css.searchBtn}>
                    <span className={css.searchLabel}> <HiSearch size={40} /> </span>
                </button>
            </form>
            </header>
        )
}

