import React, { useEffect, useRef } from 'react';
import { Layout } from '@paste/Layout';
import styled from '@emotion/styled';
import { Gutter } from '@paste/Gutter';

const Form = styled.div`
    position: fixed;
    top: 72px;
    right: 55px;
    bottom: 15px;
    left: 40px;
`;

const PasteArea = styled.textarea`
    width: 100%;
    height: 100%;
    resize: none;
    border: 0;
    margin: 0;
    padding: 0;
    color: inherit;
    outline: 0;
    font-size: 13px;
    line-height: 130%;
    white-space: pre;

    &:focus {
        outline: 0;
    }
`;

function Index() {
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const onKeyDown = async (event: KeyboardEvent) => {
        if (event.ctrlKey && event.keyCode === 83) {
            event.preventDefault();
            var content = textAreaRef.current!.value;
            if (content.trim().length > 0) {
                try {
                    const response = await (await fetch('/paste', {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ content })
                    })).json();
                    if ('url' in response) {
                        window.location.href = response['url'];
                    } else {
                        alert(response['error']);
                    }
                } catch (e) {
                    console.log(e);
                    alert('Failed to submit the post');
                }
            }
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, []);
    return (
        <Layout>
            <Gutter>></Gutter>
            <Form>
                <PasteArea ref={textAreaRef} />
            </Form>
        </Layout>
    );
}

Index.getInitialProps = async ({}) => {
    return {};
};

export default Index;
