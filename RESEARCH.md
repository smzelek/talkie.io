# Research

## Existing Apps
* FB Messenger used to use Apache HBase (distributed)
    * Apache HBase hosts very large tables (billions of rows X millions of columns)
    * Uses HDFS (Hadoop Distributed File System)
    * Read through cache service for queries, Iris 
    * They now use MyRocks (MySQL + Rocks DB)
* FB Messenger
    * Original design:
        * Pull based => 1 notification whenever new data was available, then complex HTTPS query for the new data and retrieved the full conversation data as JSON
    * New design:
        * Push-based => HTTPS call to get initial snapshot
        * Subscribe to delta updates via MQTT
        * Apply changes from MQTT onto the initial snapshot.
        * Use Thrift format instead of JSON
------
* Snowflakes for Message IDs:
    * Timestamp + Worker Number + Sequence number
    * IDS  will no longer be sorted, they will be k-sorted. We’re aiming to keep our k below 1 second, meaning that IDS within a second of one another will be within a second of one another in the id space too.
------
* Discord:
    * messages were indexed in MongoDB using channel_id and created_at
    * In Cassandra, indexed on channel_id and message_id (b/c it is a snowflake).
    * Message Table schema
        * Channel_id bigint
        * Message_id bigint
        * Author_id bigint
        * Content text
    * Channel ID is also a snowflake and is OLDER THAN THE FIRST MESSAGE
    * Query recent msgs for channel: check from [current time] to [channel_id] until enough msgs are collected
    * It was easy (ish) to migrate to Cassandra from MongoDB once Discord scaled to millions of msgs a day!

https://engineering.fb.com/2014/10/09/production-engineering/building-mobile-first-infrastructure-for-messenger/

https://engineering.fb.com/2018/06/26/core-data/migrating-messenger-storage-to-optimize-performance/

https://blog.discord.com/how-discord-stores-billions-of-messages-7fa6ec7ee4c7

## Deployment
https://www.computerworld.com/article/3429365/aws-vs-azure-vs-google-whats-the-best-cloud-platform-for-enterprise.html

### Stackoverflow unanswered vs total question activity:
GCP:
* 10,092 unanswered/28,758 questions

AWS
* 43,973 unanswered/112,014 questions

Azure
* 35,679 unanswered/100,920 questions

## CI/CD
Gitlab CI/CD with Docker containers
