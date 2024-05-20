'use client'

import React, {useEffect, useRef, useState} from 'react';
import {useTags} from "@/components/Formula/tags.queries";
import {QueryClient} from "@tanstack/query-core";
import {getTags, ITagItem} from "@/components/Formula/tags.api";
import {Wrapper} from "@/components/Formula/views/styles";
import {Controlled as CodeMirror} from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/addon/fold/foldgutter.css';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/theme/neat.css';
import 'codemirror/mode/javascript/javascript.js';


const Formula = () => {
    const queryClient = new QueryClient();
    const {tags} = useTags();
    const [suggestions, setSuggestions] = useState<ITagItem[]>([]);
    const [value, setValue] = useState('');
    const [inputValue, setInputValue] = useState('');
    const wrapper = useRef(null)

    const editorRef = useRef(null);

    useEffect(() => {
        const prefetchTags = async () => {
            await queryClient.prefetchQuery({queryKey: ['tags'], queryFn: getTags});
        };
        prefetchTags();
    }, []);

    useEffect(() => {
        if (tags?.length) {
            setSuggestions(tags);
        }
    }, [tags]);

    const handleCursorActivity = (editor: any) => {
        const cursor = editor.getCursor();
        const token = editor.getTokenAt(cursor);
        const word = token.string.trim();

        if (word && tags) {
            const filtered = tags.filter(suggestion => suggestion.name.includes(word));
            setSuggestions(filtered);
        }
    };

    const editorWillUnmount = () => {
        if (editorRef.current && wrapper.current) {
            // @ts-ignore
            editorRef.current.display.wrapper.remove();
            // @ts-ignore
            wrapper.current.hydrated = false;
        }
    }

    const handleSuggestionClick = (suggestion: ITagItem) => {
        setValue(prevValue => prevValue + suggestion.name);
    };

    return (
        tags &&
        <div>
            <Wrapper>
                <CodeMirror
                    value={value}
                    onBeforeChange={(editor, data, value) => {
                        setValue(value);
                    }}
                    onChange={(editor, data, value) => {
                        setValue(value);
                    }}
                    // @ts-ignore
                    ref={wrapper}
                    editorDidMount={(editor) => {
                        editorRef.current = editor;
                        editor.on('cursorActivity', handleCursorActivity);
                    }}
                    editorWillUnmount={editorWillUnmount}
                    options={{
                        mode: 'javascript',
                        lineNumbers: false,
                        extraKeys: {
                            Enter: (cm: any) => {
                                cm.replaceSelection('\n');
                            },
                        },
                    }}
                />
            </Wrapper>
            {suggestions.length > 0 && (
                <ul>
                    {suggestions.map((suggestion) => (
                        <li
                            key={suggestion.id + Math.random() * 5000}
                            onClick={() => handleSuggestionClick(suggestion)}
                        >
                            {suggestion.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
export default Formula;