// src/screens/HomeScreen.js
// Pantalla principal: hero con icono de la app, stats por usuario, calendario,
// botón flotante para agregar registro y modal de detalle del día.

import React, { useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import {
  PALETTE,
  RADIUS,
  SHADOW,
  SPACING,
  FONT,
  GRADIENTS,
} from '../theme/theme.js';
import Button from '../components/Button.js';
import Icon from '../components/Icon.js';
import GymCalendar from '../components/calendar/GymCalendar.js';
import DayDetailModal from '../components/calendar/DayDetailModal.js';
import GymStatsCards from '../components/gym/GymStatsCards.js';
import GymLogForm from '../components/gym/GymLogForm.js';
import MonthWinnerModal from '../components/gym/MonthWinnerModal.js';
import AppModal from '../components/ui/AppModal.js';
import ConfirmDialog from '../components/ui/ConfirmDialog.js';
import { useToast } from '../components/ui/Toast.js';
import useGymLogs from '../hooks/useGymLogs.js';
import useGymSettings from '../hooks/useGymSettings.js';
import useGymStats from '../hooks/useGymStats.js';
import useNotifications from '../hooks/useNotifications.js';
import useMonthWinner from '../hooks/useMonthWinner.js';
import {
  todayISO,
  parseISODate,
  monthLabel,
  addMonths,
} from '../utils/dates.js';

const HomeScreen = ({ onOpenSettings }) => {
  const toast = useToast();
  const { logs, loading, refresh, create, update, remove } = useGymLogs();
  const { settings } = useGymSettings();
  const users = settings?.users || [];

  useNotifications(settings, users);

  const today = todayISO();
  const todayDate = parseISODate(today);
  const [year, setYear] = useState(todayDate.getFullYear());
  const [monthIndex, setMonthIndex] = useState(todayDate.getMonth());
  const [selectedDate, setSelectedDate] = useState(today);
  const [detailVisible, setDetailVisible] = useState(false);

  // Form modal state
  const [formVisible, setFormVisible] = useState(false);
  const [editingLog, setEditingLog] = useState(null);
  const [formPersonId, setFormPersonId] = useState(null);
  const [formValid, setFormValid] = useState(false);
  const formRef = useRef(null);

  // Confirm
  const [confirm, setConfirm] = useState(null); // { log }
  const [refreshing, setRefreshing] = useState(false);

  const stats = useGymStats(logs, users, year, monthIndex);
  const { announcement, dismiss } = useMonthWinner(
    logs,
    users,
    !loading && users.length > 0
  );

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await refresh();
    } finally {
      setRefreshing(false);
    }
  };

  const goPrev = () => {
    const next = addMonths(year, monthIndex, -1);
    setYear(next.year);
    setMonthIndex(next.monthIndex);
  };
  const goNext = () => {
    const next = addMonths(year, monthIndex, 1);
    setYear(next.year);
    setMonthIndex(next.monthIndex);
  };
  const goToday = () => {
    setYear(todayDate.getFullYear());
    setMonthIndex(todayDate.getMonth());
    setSelectedDate(today);
  };

  const openAdd = (user) => {
    setEditingLog(null);
    setFormPersonId(user?.id || null);
    setFormVisible(true);
  };

  const openEdit = (log) => {
    setEditingLog(log);
    setFormPersonId(log.personId);
    setFormVisible(true);
  };

  const closeForm = () => {
    setFormVisible(false);
    setEditingLog(null);
    setFormPersonId(null);
    setFormValid(false);
  };

  const handleSelectDate = (iso) => {
    setSelectedDate(iso);
    setDetailVisible(true);
  };

  const handleSubmitForm = async (payload) => {
    try {
      if (editingLog) {
        await update(editingLog.id, payload);
        toast.show('Registro actualizado', 'success');
      } else {
        await create(payload);
        toast.show('Registro guardado', 'success');
      }
      closeForm();
    } catch (e) {
      toast.show(e.message || 'Error al guardar', 'error');
    }
  };

  const handleDelete = async () => {
    if (!confirm?.log) return;
    try {
      await remove(confirm.log.id);
      toast.show('Registro eliminado', 'info');
    } catch (e) {
      toast.show(e.message || 'Error al eliminar', 'error');
    } finally {
      setConfirm(null);
    }
  };

  const isCurrentMonth =
    todayDate.getFullYear() === year && todayDate.getMonth() === monthIndex;

  const monthDetailTitle = useMemo(
    () => monthLabel(year, monthIndex),
    [year, monthIndex]
  );

  return (
    <View style={{ flex: 1, backgroundColor: PALETTE.bg }}>
      <StatusBar style="light" />
      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {/* HERO */}
          <LinearGradient
            colors={GRADIENTS.hero}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.hero}
          >
            <View style={styles.heroTopRow}>
              <View style={styles.brandRow}>
                <Image
                  source={require('../../assets/icon.png')}
                  style={styles.appIcon}
                />
                <View>
                  <Text style={styles.heroTitle}>Gym Tracker</Text>
                  <Text style={styles.heroSubtitle}>
                    {monthDetailTitle}
                  </Text>
                </View>
              </View>
              <Pressable
                onPress={onOpenSettings}
                style={styles.settingsBtn}
                hitSlop={8}
              >
                <Icon name="settings-outline" size={20} color="#FFFFFF" />
              </Pressable>
            </View>

            <View style={styles.heroMetrics}>
              <View style={styles.heroMetric}>
                <Text style={styles.heroMetricValue}>{stats.totals.days}</Text>
                <Text style={styles.heroMetricLabel}>Días activos</Text>
              </View>
              <View style={styles.heroDivider} />
              <View style={styles.heroMetric}>
                <Text style={styles.heroMetricValue}>
                  {stats.totals.routines}
                </Text>
                <Text style={styles.heroMetricLabel}>Rutinas totales</Text>
              </View>
            </View>
          </LinearGradient>

          {/* BODY */}
          <View style={styles.body}>
            <GymStatsCards users={users} perUser={stats.perUser} logs={logs} />

            <View style={{ height: SPACING.lg }} />

            {!isCurrentMonth ? (
              <Pressable onPress={goToday} style={styles.todayPill} hitSlop={6}>
                <Icon name="calendar-outline" size={14} color={PALETTE.accent} />
                <Text style={styles.todayPillText}>Volver a hoy</Text>
              </Pressable>
            ) : null}

            <GymCalendar
              year={year}
              monthIndex={monthIndex}
              logs={logs}
              users={users}
              selectedDate={selectedDate}
              onSelectDate={handleSelectDate}
              onPrevMonth={goPrev}
              onNextMonth={goNext}
              onToday={goToday}
            />

            <View style={{ height: SPACING.xxl }} />
          </View>
        </ScrollView>

        {/* CTA flotante */}
        <View style={styles.fabWrap} pointerEvents="box-none">
          <Button
            title="Agregar registro"
            icon="add"
            gradient
            onPress={() => openAdd(null)}
          />
        </View>
      </SafeAreaView>

      {/* MODAL: detalle del día */}
      <DayDetailModal
        visible={detailVisible}
        date={selectedDate}
        users={users}
        logs={logs}
        onClose={() => setDetailVisible(false)}
        onAdd={(u) => {
          setDetailVisible(false);
          openAdd(u);
        }}
        onEdit={(l) => {
          setDetailVisible(false);
          openEdit(l);
        }}
        onDelete={(l) => setConfirm({ log: l })}
      />

      {/* MODAL: formulario */}
      <AppModal
        visible={formVisible}
        onClose={closeForm}
        title={editingLog ? 'Editar registro' : 'Nuevo registro'}
        subtitle={editingLog ? editingLog.date : selectedDate || today}
        footer={
          <View style={styles.formFooter}>
            <View style={{ flex: 1 }}>
              <Button
                title="Cancelar"
                variant="secondary"
                onPress={closeForm}
                fullWidth
              />
            </View>
            <View style={{ flex: 1 }}>
              <Button
                title="Guardar"
                icon="checkmark"
                gradient
                disabled={!formValid}
                onPress={() => formRef.current?.submit()}
                fullWidth
              />
            </View>
          </View>
        }
      >
        <GymLogForm
          ref={formRef}
          initial={editingLog}
          users={users}
          defaultDate={selectedDate || today}
          defaultPersonId={formPersonId}
          onSubmit={handleSubmitForm}
          onValidityChange={setFormValid}
        />
      </AppModal>

      {/* MODAL: confirmar borrado */}
      <ConfirmDialog
        visible={!!confirm}
        title="¿Eliminar registro?"
        message="Esta acción no se puede deshacer."
        confirmLabel="Eliminar"
        onConfirm={handleDelete}
        onCancel={() => setConfirm(null)}
      />

      {/* MODAL: ganador del mes */}
      <MonthWinnerModal
        visible={!!announcement}
        data={announcement}
        onClose={dismiss}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  scroll: { paddingBottom: 120 },
  hero: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.xl,
    borderBottomLeftRadius: RADIUS.xl,
    borderBottomRightRadius: RADIUS.xl,
  },
  heroTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.lg,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    flex: 1,
  },
  appIcon: {
    width: 42,
    height: 42,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
  },
  heroTitle: {
    color: '#FFFFFF',
    fontSize: FONT.size.xxl,
    fontWeight: FONT.weight.bold,
    letterSpacing: 0.2,
  },
  heroSubtitle: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: FONT.size.sm,
    marginTop: 2,
    textTransform: 'capitalize',
  },
  settingsBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.18)',
  },
  heroMetrics: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderRadius: RADIUS.lg,
    paddingVertical: SPACING.md,
  },
  heroMetric: { flex: 1, alignItems: 'center' },
  heroMetricValue: {
    color: '#FFFFFF',
    fontSize: FONT.size.display,
    fontWeight: FONT.weight.bold,
  },
  heroMetricLabel: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: FONT.size.xs,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginTop: 2,
    fontWeight: FONT.weight.semibold,
  },
  heroDivider: {
    width: 1,
    height: 36,
    backgroundColor: 'rgba(255,255,255,0.4)',
  },
  body: {
    paddingHorizontal: SPACING.lg,
    marginTop: SPACING.xl,
  },
  todayPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
    backgroundColor: PALETTE.surface,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: RADIUS.pill,
    borderWidth: 1,
    borderColor: PALETTE.borderStrong,
    marginBottom: SPACING.sm,
  },
  todayPillText: {
    color: PALETTE.accent,
    fontWeight: FONT.weight.bold,
    fontSize: FONT.size.sm,
  },
  fabWrap: {
    position: 'absolute',
    left: SPACING.lg,
    right: SPACING.lg,
    bottom: SPACING.lg,
  },
  formFooter: { flexDirection: 'row', gap: SPACING.sm },
});

export default HomeScreen;
