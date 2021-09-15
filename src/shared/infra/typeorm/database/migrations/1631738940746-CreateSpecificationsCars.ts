import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm"

export class CreateSpecificationsCars1631738940746
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "specifications_cars",
        columns: [
          {
            name: "carId",
            type: "uuid",
          },
          {
            name: "specificationId",
            type: "uuid",
          },
          {
            name: "createdAt",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    )

    await queryRunner.createForeignKey(
      "specifications_cars",
      new TableForeignKey({
        name: "FKSpecificationCar",
        referencedTableName: "specifications",
        referencedColumnNames: ["id"],
        columnNames: ["specificationId"],
        onDelete: "SET NULL",
        onUpdate: "SET NULL",
      })
    )

    await queryRunner.createForeignKey(
      "specifications_cars",
      new TableForeignKey({
        name: "FKCarSpecification",
        referencedTableName: "cars",
        referencedColumnNames: ["id"],
        columnNames: ["carId"],
        onDelete: "SET NULL",
        onUpdate: "SET NULL",
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      "specifications_cars",
      "FKCarSpecification"
    )

    await queryRunner.dropForeignKey(
      "specifications_cars",
      "FKSpecificationCar"
    )

    await queryRunner.dropTable("specifications_cars")
  }
}
