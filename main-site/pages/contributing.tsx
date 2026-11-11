import {
    Container,
    ContainerPadded,
    SEO,
    SectionHeading
} from '@enginehub/shared';

import Layout from '../src/components/Layout';

const ContributingPage = () => (
    <Layout>
        <SEO
            title="Contributing Guidelines"
            description="Guidelines for contributing to EngineHub projects."
            image="/images/enginehub-logo.png"
        />
        <div className={`${Container} ${ContainerPadded}`}>
            <h1 className={SectionHeading}>Contributing Guidelines</h1>
            <p>
                Thank you for your interest in contributing to EngineHub
                projects! We appreciate your effort and contribution, but to
                make sure that the inclusion of your PR is a smooth process, we
                ask that you make note of the following guidelines. Individual
                projects may have additional requirements and style guidelines,
                so make sure to check the contributing guide in the project
                repository before submitting a change.
            </p>

            <h2 className={SectionHeading}>Contributing</h2>
            <ul>
                <li>
                    <strong>Make sure the code is efficient.</strong> One way
                    you can achieve this is to spend around ten minutes to think
                    about what the code is doing and whether it seems awfully
                    roundabout. If you had to copy the same large piece of code
                    in several places, that's bad.
                </li>
                <li>
                    <strong>Test your code.</strong> We're not interested in
                    broken code, for the obvious reasons.
                </li>
                <li>
                    <strong>Write tests.</strong> While this is optional, we
                    recommend it for complicated algorithms and are trying to
                    improve our overall test code coverage.
                </li>
                <li>
                    <strong>Understand your contributions.</strong> We have a
                    base expectation that you have read the code you are
                    contributing, and understand what it's doing. We ask that
                    you please respect that people will be reviewing your code,
                    and that you have proofread it and understand it before
                    submitting.
                </li>
                <li>
                    <strong>No non-human co-authors.</strong> While we do not
                    have a hard rule against AI-assisted development, we ask
                    that all code is vetted by a human contributor before
                    submission. Including a non-human co-author implies a level
                    of vetting far below what we expect.
                </li>
            </ul>

            <h2 className={SectionHeading}>Checklist</h2>
            <p>Ready to submit? Perform the checklist below:</p>
            <ol>
                <li>
                    Have I <code>git rebase</code>'d my pull request to the
                    latest commit of the target branch?
                </li>
                <li>
                    Have I combined my commits into a reasonably small number
                    (if not one) commit using <code>git rebase</code>?
                </li>
                <li>
                    Have I made my pull request too large? Pull requests should
                    introduce small sets of changes at a time. Major changes
                    should be discussed with the team prior to starting work.
                </li>
                <li>Are my commit messages descriptive?</li>
                <li>
                    <strong>Keep commit summaries under 70 characters.</strong>{' '}
                    For more details, place two new lines after the summary line
                    and write away!
                </li>
            </ol>
            <p>
                You should be aware of{' '}
                <a href="https://docs.github.com/github/getting-started-with-github/about-git-rebase">
                    <code>git rebase</code>
                </a>
                . It allows you to modify existing commit messages, and combine,
                break apart, or adjust past changes.
            </p>
        </div>
    </Layout>
);

export default ContributingPage;
