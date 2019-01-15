﻿using Hivemind.Contracts;
using Hivemind.Entities;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using TechTalk.SpecFlow;
using TechTalk.SpecFlow.Assist;

namespace Hivemind.Api.Core.Tests.Steps
{
    [Binding]
    public class UserSteps : Steps
    {
        private const string UserPath = "api/user";
        private const string TokenPath = "api/login";
        private const string AddedUserKey = "AddedUserKey";
        private const string TokenKey = "TokenKey";
        private const string GuidKey = "Guid";

        private ScenarioContext _scenarioContext;

        public UserSteps(Context context, ScenarioContext scenarioContext)
            : base(context)
        {
            _scenarioContext = scenarioContext;
        }

        [When(@"I add a user as follows:")]
        public void WhenIAddAUserAsFollows(Table table)
        {
            var login = table.CreateInstance<Login>();
            var guid = Guid.NewGuid().ToString();
            _scenarioContext.Add(GuidKey, guid);

            login.Email = login.Email + guid;

            ////var httpClient = new HttpClient();
            ////httpClient.PostAsync()
            var user = _context.Post<Login, User, object>(UserPath, login);
            _scenarioContext.Add(AddedUserKey, user);
        }

        [When(@"I get user information")]
        public void WhenIGetUserInformation()
        {
            _context.Get<User>(UserPath);
        }

        [When(@"I retrieve token with using:")]
        public void WhenIRetrieveTokenWithUsing(Table table)
        {
            var login = table.CreateInstance<Login>();
            var guid = _scenarioContext.Get<string>(GuidKey);
            login.Email = login.Email + guid;

            var jsonResponse = _context.Post<Login, object, object>(TokenPath, login);
            _scenarioContext.Add(TokenKey, jsonResponse);
        }

        [When(@"I get user information with token:")]
        public void WhenIGetUserInformationWithToken(Table table)
        {
            var token = table.Rows.FirstOrDefault().GetString("Token");
            _context.SetTokenHeader(token);

            _context.Get<User>(UserPath);
        }

        [Then(@"the user should be added")]
        public void ThenTheUserShouldBeAdded()
        {
            var user = _scenarioContext.Get<User>(AddedUserKey);

            Assert.NotNull(user);
            Assert.NotNull(user.UserGUID);
        }

        [Then(@"I should receive a token")]
        public void ThenIShouldReceiveAToken()
        {
            var token = _scenarioContext.Get<object>(TokenKey);

            Assert.NotNull(token);
        }
    }
}