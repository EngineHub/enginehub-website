import React, { useEffect, useRef, useState } from 'react';
import { Layout } from '@paste/Layout';
import styled from '@emotion/styled';
import { Gutter } from '@paste/Gutter';
import Loader from '@shared/components/Loader';
import Router from 'next/router';

const Form = styled.div`
    position: fixed;
    top: 72px;
    right: 0;
    bottom: 0;
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

const SavingOverlay = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 2;
    display: flex;
    justify-content: center;
    align-items: center;
`;

function Index() {
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const [saving, setSaving] = useState(false);

    const save = async () => {
        setSaving(true);
        var content = textAreaRef.current!.value;
        if (content.trim().length > 0) {
            try {
                const response = await(
                    await fetch('/paste', {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ content })
                    })
                ).json();
                if ('url' in response) {
                    const url = response.url;
                    alert("Saved! Available at " + url);
                    if (url.startsWith('https://paste.enginehub.org')) {
                        Router.push('/[id]', url.substring('https://paste.enginehub.org'.length));
                    } else {
                        window.location.href = url;
                    }
                } else {
                    alert(response['error']);
                }
            } catch (e) {
                console.log(e);
                alert('Failed to submit the post');
            }
            setSaving(false);
        }
    };

    const onKeyDown = async (event: KeyboardEvent) => {
        if (!saving && event.ctrlKey && event.keyCode === 83) {
            event.preventDefault();
            await save();
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, []);
    return (
        <Layout saveCallback={save}>
            <Gutter>&gt;</Gutter>
            <Form>
                <PasteArea ref={textAreaRef} />
            </Form>
            {saving && (
                <SavingOverlay>
                    <Loader />
                </SavingOverlay>
            )}
        </Layout>
    );
}

Index.getInitialProps = async ({}) => {
    return {};
};

export default Index;
