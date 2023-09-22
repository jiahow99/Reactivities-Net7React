using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class ActivityPhotos : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Photos_Activities_ActivityId",
                table: "Photos");

            migrationBuilder.DropIndex(
                name: "IX_Photos_ActivityId",
                table: "Photos");

            migrationBuilder.DropColumn(
                name: "ActivityId",
                table: "Photos");

            migrationBuilder.CreateTable(
                name: "ActivityPhotos",
                columns: table => new
                {
                    Id = table.Column<string>(type: "TEXT", nullable: false),
                    Url = table.Column<string>(type: "TEXT", nullable: false),
                    ActivityId = table.Column<Guid>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ActivityPhotos", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ActivityPhotos_Activities_ActivityId",
                        column: x => x.ActivityId,
                        principalTable: "Activities",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_ActivityPhotos_ActivityId",
                table: "ActivityPhotos",
                column: "ActivityId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ActivityPhotos");

            migrationBuilder.AddColumn<Guid>(
                name: "ActivityId",
                table: "Photos",
                type: "TEXT",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Photos_ActivityId",
                table: "Photos",
                column: "ActivityId");

            migrationBuilder.AddForeignKey(
                name: "FK_Photos_Activities_ActivityId",
                table: "Photos",
                column: "ActivityId",
                principalTable: "Activities",
                principalColumn: "Id");
        }
    }
}
