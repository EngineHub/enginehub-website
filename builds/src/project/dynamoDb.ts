import AWS from 'aws-sdk';
import { Build } from './types';

AWS.config.update({
    region: 'us-east-1'
});

const dynamoDB = new AWS.DynamoDB();
const docClient = new AWS.DynamoDB.DocumentClient();

const BuildsTableName = 'Builds';

export function createTable() {
    const createParams: AWS.DynamoDB.CreateTableInput = {
        TableName: BuildsTableName,
        KeySchema: [
            {
                AttributeName: 'build_id',
                KeyType: 'HASH'
            }
        ],
        AttributeDefinitions: [
            {
                AttributeName: 'build_id',
                AttributeType: 'S'
            }
        ],
        BillingMode: 'PAY_PER_REQUEST'
    };

    dynamoDB.createTable(
        createParams,
        (err: AWS.AWSError, data: AWS.DynamoDB.CreateTableOutput) => {
            if (err) {
                console.error(
                    'Failed to create table. ',
                    JSON.stringify(err, null, 2)
                );
            } else {
                console.log('Created table. ', JSON.stringify(data, null, 2));
            }
        }
    );
}

export async function getBuild(build_id: string): Promise<Build> {
    if (process.env.NODE_ENV !== 'production') {
        return await Promise.resolve({
            build_id,
            build_number: 10,
            build_hash: 'abababa',
            build_date: Date.now(),
            project: 'worldedit',
            state: 'SUCCESS',
            download_count: 10,
            branch: 'master',
            data: {
                changes: [
                    {
                        version: 'abababa',
                        username: 'testerson',
                        summary: 'Made some test changes',
                        date: Date.now()
                    },
                    {
                        version: 'abababa',
                        username: 'testerson',
                        summary: 'Made some test changes',
                        date: Date.now()
                    }
                ],
                artifacts: [
                    {
                        name: 'test-jar-dist.jar',
                        size: 1024 * 1024 * 1024
                    }
                ]
            }
        });
    }
    const readParams: AWS.DynamoDB.DocumentClient.GetItemInput = {
        TableName: BuildsTableName,
        Key: {
            build_id
        }
    };

    return await new Promise((resolve, reject) => {
        docClient.get(readParams, (err, data) => {
            if (err || !data || !data.Item) {
                reject(err);
            } else {
                resolve(data.Item as Build);
            }
        });
    });
}
