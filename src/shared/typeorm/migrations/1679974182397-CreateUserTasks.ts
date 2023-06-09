import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUserTasks1679974182397 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name:'tasks',
            columns:[
                {
                    name:'id',
                    type:'uuid',
                    isPrimary:true,
                    generationStrategy:"uuid",
                    default:'uuid_generate_v4()'
                },
                {
                    name:'task_content',
                    type:'varchar',
                },
                {
                    name: 'user_id',
                    type: 'uuid'
                },
                {
                    name: 'created_at',
                    type: 'timestamp with time zone',
                    default: 'now()',
                },
                {
                    name: 'updated_at',
                    type: 'timestamp with time zone',
                    default: 'now()',
                },
            ],
            foreignKeys:[
                {
                    name:'TaskUser',
                    referencedTableName:'users',
                    referencedColumnNames:['id'],
                    columnNames:['user_id'],
                    onDelete:'CASCADE',
                    onUpdate:'CASCADE'
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('tasks')
    }

}
