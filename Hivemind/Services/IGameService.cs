﻿using Hivemind.Contracts;
using Hivemind.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hivemind.Services
{
    public interface IGameService
    {
        PreGameReport ProcessPreGame(string gangId);
        PostGameReport ProcessPostGame(BattleReport battleReport);
        IEnumerable<GangerSkill> SkillUpGangers(GangSkillUpRequest skillUpRequest);
    }
}
