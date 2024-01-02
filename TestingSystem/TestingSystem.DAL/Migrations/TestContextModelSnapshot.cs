﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using TestingSystem.DAL;

#nullable disable

namespace TestingSystem.DAL.Migrations
{
    [DbContext(typeof(TestContext))]
    partial class TestContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.25")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("AllowList", b =>
                {
                    b.Property<int>("AccessibleTestsId")
                        .HasColumnType("int");

                    b.Property<int>("AllowedUsersId")
                        .HasColumnType("int");

                    b.HasKey("AccessibleTestsId", "AllowedUsersId");

                    b.HasIndex("AllowedUsersId");

                    b.ToTable("AllowList");
                });

            modelBuilder.Entity("QuestionTag", b =>
                {
                    b.Property<int>("QuestionsId")
                        .HasColumnType("int");

                    b.Property<int>("TagsId")
                        .HasColumnType("int");

                    b.HasKey("QuestionsId", "TagsId");

                    b.HasIndex("TagsId");

                    b.ToTable("QuestionTag");
                });

            modelBuilder.Entity("QuestionTestVariant", b =>
                {
                    b.Property<int>("QuestionsId")
                        .HasColumnType("int");

                    b.Property<int>("TestVariantsId")
                        .HasColumnType("int");

                    b.HasKey("QuestionsId", "TestVariantsId");

                    b.HasIndex("TestVariantsId");

                    b.ToTable("QuestionTestVariant");
                });

            modelBuilder.Entity("TagTest", b =>
                {
                    b.Property<int>("TagsId")
                        .HasColumnType("int");

                    b.Property<int>("TestsId")
                        .HasColumnType("int");

                    b.HasKey("TagsId", "TestsId");

                    b.HasIndex("TestsId");

                    b.ToTable("TagTest");
                });

            modelBuilder.Entity("TestingSystem.DAL.Models.Log", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<DateTime>("DateTime")
                        .HasColumnType("datetime2");

                    b.Property<TimeSpan>("ExpiredTime")
                        .HasColumnType("time");

                    b.Property<double>("Mark")
                        .HasColumnType("float");

                    b.Property<int>("NumberOfCorrectAnswers")
                        .HasColumnType("int");

                    b.Property<int?>("TestId")
                        .HasColumnType("int");

                    b.Property<int?>("UserId")
                        .HasColumnType("int");

                    b.Property<int>("VariantNumer")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("TestId");

                    b.HasIndex("UserId");

                    b.ToTable("Logs");
                });

            modelBuilder.Entity("TestingSystem.DAL.Models.Model", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Models");
                });

            modelBuilder.Entity("TestingSystem.DAL.Models.Question", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<int>("ModelId")
                        .HasColumnType("int");

                    b.Property<string>("Query")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("QuestionTypeId")
                        .HasColumnType("int");

                    b.Property<int?>("QuestionsAssemblyId")
                        .HasColumnType("int");

                    b.Property<double>("aParam")
                        .HasColumnType("float");

                    b.Property<double>("bParam")
                        .HasColumnType("float");

                    b.Property<double>("cParam")
                        .HasColumnType("float");

                    b.HasKey("Id");

                    b.HasIndex("ModelId");

                    b.HasIndex("QuestionTypeId");

                    b.HasIndex("QuestionsAssemblyId");

                    b.ToTable("Questions");
                });

            modelBuilder.Entity("TestingSystem.DAL.Models.QuestionsAssembly", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("OwnerId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("OwnerId");

                    b.ToTable("QuestionsAssemblies");
                });

            modelBuilder.Entity("TestingSystem.DAL.Models.QuestionType", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("QuestionTypes");
                });

            modelBuilder.Entity("TestingSystem.DAL.Models.RefreshToken", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<DateTime?>("ExpiryTime")
                        .HasColumnType("datetime2");

                    b.Property<string>("Token")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UserId")
                        .IsUnique();

                    b.ToTable("RefreshTokens");
                });

            modelBuilder.Entity("TestingSystem.DAL.Models.Role", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Roles");
                });

            modelBuilder.Entity("TestingSystem.DAL.Models.Tag", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Tags");
                });

            modelBuilder.Entity("TestingSystem.DAL.Models.Test", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<DateTime?>("ClosureTime")
                        .HasColumnType("datetime2");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<TimeSpan?>("Duration")
                        .HasColumnType("time");

                    b.Property<bool?>("IsAccessOpen")
                        .HasColumnType("bit");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("NumberOfVariants")
                        .HasColumnType("int");

                    b.Property<DateTime?>("OpeningTime")
                        .HasColumnType("datetime2");

                    b.Property<int>("OwnerId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("OwnerId");

                    b.ToTable("Tests");
                });

            modelBuilder.Entity("TestingSystem.DAL.Models.TestVariant", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<int>("Number")
                        .HasColumnType("int");

                    b.Property<int>("TestId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("TestId");

                    b.ToTable("TestVariants");
                });

            modelBuilder.Entity("TestingSystem.DAL.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("EMail")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Login")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Password")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("RoleId")
                        .HasColumnType("int");

                    b.Property<string>("Surname")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("TestingSystem.DAL.Models.VariantOfAnswer", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("Answer")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool?>("IsCorrect")
                        .HasColumnType("bit");

                    b.Property<int>("QuestionId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("QuestionId");

                    b.ToTable("VariantsOfAnswer");
                });

            modelBuilder.Entity("AllowList", b =>
                {
                    b.HasOne("TestingSystem.DAL.Models.Test", null)
                        .WithMany()
                        .HasForeignKey("AccessibleTestsId")
                        .OnDelete(DeleteBehavior.ClientCascade)
                        .IsRequired();

                    b.HasOne("TestingSystem.DAL.Models.User", null)
                        .WithMany()
                        .HasForeignKey("AllowedUsersId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("QuestionTag", b =>
                {
                    b.HasOne("TestingSystem.DAL.Models.Question", null)
                        .WithMany()
                        .HasForeignKey("QuestionsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("TestingSystem.DAL.Models.Tag", null)
                        .WithMany()
                        .HasForeignKey("TagsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("QuestionTestVariant", b =>
                {
                    b.HasOne("TestingSystem.DAL.Models.Question", null)
                        .WithMany()
                        .HasForeignKey("QuestionsId")
                        .OnDelete(DeleteBehavior.ClientCascade)
                        .IsRequired();

                    b.HasOne("TestingSystem.DAL.Models.TestVariant", null)
                        .WithMany()
                        .HasForeignKey("TestVariantsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("TagTest", b =>
                {
                    b.HasOne("TestingSystem.DAL.Models.Tag", null)
                        .WithMany()
                        .HasForeignKey("TagsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("TestingSystem.DAL.Models.Test", null)
                        .WithMany()
                        .HasForeignKey("TestsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("TestingSystem.DAL.Models.Log", b =>
                {
                    b.HasOne("TestingSystem.DAL.Models.Test", "Test")
                        .WithMany("Logs")
                        .HasForeignKey("TestId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("TestingSystem.DAL.Models.User", "User")
                        .WithMany("Logs")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.NoAction);

                    b.Navigation("Test");

                    b.Navigation("User");
                });

            modelBuilder.Entity("TestingSystem.DAL.Models.Question", b =>
                {
                    b.HasOne("TestingSystem.DAL.Models.Model", "Model")
                        .WithMany("Questions")
                        .HasForeignKey("ModelId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("TestingSystem.DAL.Models.QuestionType", "QuestionType")
                        .WithMany("Questions")
                        .HasForeignKey("QuestionTypeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("TestingSystem.DAL.Models.QuestionsAssembly", "QuestionsAssembly")
                        .WithMany("Questions")
                        .HasForeignKey("QuestionsAssemblyId");

                    b.Navigation("Model");

                    b.Navigation("QuestionType");

                    b.Navigation("QuestionsAssembly");
                });

            modelBuilder.Entity("TestingSystem.DAL.Models.QuestionsAssembly", b =>
                {
                    b.HasOne("TestingSystem.DAL.Models.User", "Owner")
                        .WithMany("QuestionsAssemblyies")
                        .HasForeignKey("OwnerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Owner");
                });

            modelBuilder.Entity("TestingSystem.DAL.Models.RefreshToken", b =>
                {
                    b.HasOne("TestingSystem.DAL.Models.User", "User")
                        .WithOne("RefreshToken")
                        .HasForeignKey("TestingSystem.DAL.Models.RefreshToken", "UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("TestingSystem.DAL.Models.Test", b =>
                {
                    b.HasOne("TestingSystem.DAL.Models.User", "Owner")
                        .WithMany("OwnedTests")
                        .HasForeignKey("OwnerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Owner");
                });

            modelBuilder.Entity("TestingSystem.DAL.Models.TestVariant", b =>
                {
                    b.HasOne("TestingSystem.DAL.Models.Test", "Test")
                        .WithMany("TestVariants")
                        .HasForeignKey("TestId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Test");
                });

            modelBuilder.Entity("TestingSystem.DAL.Models.User", b =>
                {
                    b.HasOne("TestingSystem.DAL.Models.Role", "Role")
                        .WithMany("Users")
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Role");
                });

            modelBuilder.Entity("TestingSystem.DAL.Models.VariantOfAnswer", b =>
                {
                    b.HasOne("TestingSystem.DAL.Models.Question", "Question")
                        .WithMany("Answers")
                        .HasForeignKey("QuestionId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Question");
                });

            modelBuilder.Entity("TestingSystem.DAL.Models.Model", b =>
                {
                    b.Navigation("Questions");
                });

            modelBuilder.Entity("TestingSystem.DAL.Models.Question", b =>
                {
                    b.Navigation("Answers");
                });

            modelBuilder.Entity("TestingSystem.DAL.Models.QuestionsAssembly", b =>
                {
                    b.Navigation("Questions");
                });

            modelBuilder.Entity("TestingSystem.DAL.Models.QuestionType", b =>
                {
                    b.Navigation("Questions");
                });

            modelBuilder.Entity("TestingSystem.DAL.Models.Role", b =>
                {
                    b.Navigation("Users");
                });

            modelBuilder.Entity("TestingSystem.DAL.Models.Test", b =>
                {
                    b.Navigation("Logs");

                    b.Navigation("TestVariants");
                });

            modelBuilder.Entity("TestingSystem.DAL.Models.User", b =>
                {
                    b.Navigation("Logs");

                    b.Navigation("OwnedTests");

                    b.Navigation("QuestionsAssemblyies");

                    b.Navigation("RefreshToken");
                });
#pragma warning restore 612, 618
        }
    }
}
